const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_CHAT_MODEL = process.env.GEMINI_CHAT_MODEL || "gemini-2.5-flash";
const DEFAULT_VISION_MODEL =
  process.env.GEMINI_VISION_MODEL || process.env.GEMINI_CHAT_MODEL || "gemini-2.5-flash";

type GeminiTextPart = {
  text: string;
};

type GeminiInlineDataPart = {
  inline_data: {
    mime_type: string;
    data: string;
  };
};

type GeminiPart = GeminiTextPart | GeminiInlineDataPart;

type GeminiResponseTextPart = {
  text?: string | null;
};

type GeminiResponseCandidate = {
  content?: {
    parts?: GeminiResponseTextPart[] | null;
  } | null;
};

type GeminiGenerateContentResponse = {
  candidates?: GeminiResponseCandidate[] | null;
};

type DashboardChatContext = {
  activePatientName?: string | null;
  activeSymptoms?: string | null;
  activeDiagnosis?: string | null;
  pendingAppointments?: number;
  serviceCount?: number;
};

type RetinaAnalysisParams = {
  patientName: string;
  patientCode?: string | null;
  screeningNote?: string | null;
  historySummary?: string | null;
  imageDataUrl: string;
};

type RetinaAnalysisResult = {
  stageLabel: string;
  riskLevel: "low" | "medium" | "high";
  summary: string;
  doctorAdvice: string;
  findings: string[];
  confidenceScore: number;
};

type GeminiResponsePayload = {
  response: GeminiGenerateContentResponse;
  model: string;
};

export class GeminiRequestError extends Error {
  status: number;
  detail: string;

  constructor(message: string, status: number, detail?: string) {
    super(message);
    this.name = "GeminiRequestError";
    this.status = status;
    this.detail = detail || message;
  }
}

function getGeminiApiKey() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  return apiKey;
}

export function hasGeminiApiKey() {
  return Boolean(process.env.GEMINI_API_KEY);
}

export function getGeminiRuntimeConfig() {
  return {
    provider: "gemini",
    configured: hasGeminiApiKey(),
    chatModel: DEFAULT_CHAT_MODEL,
    visionModel: DEFAULT_VISION_MODEL,
  };
}

function extractGeminiErrorDetail(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    const detail = parsed?.error?.message;

    if (typeof detail === "string" && detail.trim()) {
      return detail.trim();
    }
  } catch {
    // Fall back to the raw response text below.
  }

  return raw;
}

async function createGeminiResponse({
  model,
  systemInstruction,
  parts,
  responseMimeType,
}: {
  model: string;
  systemInstruction?: string;
  parts: GeminiPart[];
  responseMimeType?: string;
}): Promise<GeminiResponsePayload> {
  const response = await fetch(`${GEMINI_API_BASE_URL}/${model}:generateContent`, {
    method: "POST",
    headers: {
      "x-goog-api-key": getGeminiApiKey(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...(systemInstruction
        ? {
            system_instruction: {
              parts: [{ text: systemInstruction }],
            },
          }
        : {}),
      contents: [
        {
          role: "user",
          parts,
        },
      ],
      ...(responseMimeType
        ? {
            generationConfig: {
              responseMimeType,
            },
          }
        : {}),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new GeminiRequestError(
      `Gemini request failed with status ${response.status}`,
      response.status,
      extractGeminiErrorDetail(errorText)
    );
  }

  return {
    response: (await response.json()) as GeminiGenerateContentResponse,
    model,
  };
}

function extractOutputText(response: GeminiGenerateContentResponse) {
  const parts =
    response.candidates?.flatMap((candidate) => candidate.content?.parts ?? []).map((part) => part.text) ?? [];

  return parts
    .filter((value: unknown) => typeof value === "string" && value.trim())
    .join("\n")
    .trim();
}

function extractJsonObject<T>(value: string): T {
  const fencedMatch = value.match(/```json\s*([\s\S]*?)```/i);
  const raw = fencedMatch?.[1] || value;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("Model response did not contain a JSON object.");
  }

  return JSON.parse(raw.slice(start, end + 1)) as T;
}

function summarizeChatContext(context: DashboardChatContext) {
  return [
    context.activePatientName ? `Bệnh nhân đang xử lý: ${context.activePatientName}.` : null,
    context.activeSymptoms ? `Triệu chứng chính: ${context.activeSymptoms}.` : null,
    context.activeDiagnosis ? `Gợi ý AI gần nhất: ${context.activeDiagnosis}.` : null,
    typeof context.pendingAppointments === "number"
      ? `Số cuộc hẹn đang chờ: ${context.pendingAppointments}.`
      : null,
    typeof context.serviceCount === "number"
      ? `Số dịch vụ liên quan hôm nay: ${context.serviceCount}.`
      : null,
  ]
    .filter(Boolean)
    .join("\n");
}

async function createChatResponseWithFallback(parts: GeminiPart[], systemInstruction: string) {
  const fallbackModels = Array.from(new Set([DEFAULT_CHAT_MODEL, "gemini-2.5-flash"]));
  let lastError: unknown = null;

  for (const model of fallbackModels) {
    try {
      return await createGeminiResponse({
        model,
        systemInstruction,
        parts,
      });
    } catch (error) {
      lastError = error;

      if (error instanceof GeminiRequestError) {
        const shouldFallback = [400, 403, 404].includes(error.status);
        if (shouldFallback && model !== fallbackModels[fallbackModels.length - 1]) {
          continue;
        }
      }

      throw error;
    }
  }

  throw lastError || new Error("Unable to create Gemini chat response.");
}

function parseDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:(.+?);base64,(.+)$/);

  if (!match) {
    throw new Error("Invalid image data URL.");
  }

  return {
    mimeType: match[1],
    base64Data: match[2],
  };
}

export async function generateDashboardAssistantReply(
  message: string,
  context: DashboardChatContext
) {
  const payload = await createChatResponseWithFallback(
    [
      {
        text: `${summarizeChatContext(context)}\n\nYêu cầu của bác sĩ: ${message}`.trim(),
      },
    ],
    "Bạn là trợ lý MedAssist cho bác sĩ. Trả lời bằng tiếng Việt, ngắn gọn, rõ ràng, thực tế và ưu tiên hành động tiếp theo. Không khẳng định chẩn đoán chắc chắn nếu thiếu dữ liệu lâm sàng."
  );

  return {
    reply:
      extractOutputText(payload.response) ||
      "MedAssist AI chưa tạo được phản hồi phù hợp. Vui lòng thử lại với câu hỏi cụ thể hơn.",
    model: payload.model,
  };
}

export async function analyzeRetinaImage(
  params: RetinaAnalysisParams
): Promise<RetinaAnalysisResult> {
  const { mimeType, base64Data } = parseDataUrl(params.imageDataUrl);

  const payload = await createGeminiResponse({
    model: DEFAULT_VISION_MODEL,
    systemInstruction:
      "Bạn là trợ lý AI hỗ trợ sàng lọc võng mạc cho bác sĩ. Đây là kết quả tham khảo hỗ trợ bác sĩ, không phải kết luận chẩn đoán cuối cùng. Chỉ trả về JSON hợp lệ, không markdown, không giải thích thêm.",
    parts: [
      {
        inline_data: {
          mime_type: mimeType,
          data: base64Data,
        },
      },
      {
        text: [
          "Phân tích ảnh đáy mắt sau cho mục đích sàng lọc ban đầu.",
          `Bệnh nhân: ${params.patientName}.`,
          params.patientCode ? `Mã hồ sơ: ${params.patientCode}.` : null,
          params.screeningNote ? `Ghi chú sàng lọc: ${params.screeningNote}.` : null,
          params.historySummary ? `Lịch sử liên quan: ${params.historySummary}.` : null,
          'Hãy phân loại mức độ bệnh võng mạc theo thang 0-4. Trường "stageLabel" chỉ dùng một trong các giá trị: "Độ 0", "Độ 1", "Độ 2", "Độ 3", "Độ 4".',
          'Trả về JSON với đúng các khóa: "stageLabel", "riskLevel", "summary", "doctorAdvice", "findings", "confidenceScore".',
          'Quy ước "riskLevel" chỉ dùng một trong: "low", "medium", "high".',
          'Quy ước "findings" là mảng chuỗi ngắn, tối đa 4 ý.',
          'Quy ước "confidenceScore" là số từ 0 đến 1.',
        ]
          .filter(Boolean)
          .join("\n"),
      },
    ],
    responseMimeType: "application/json",
  });

  const text = extractOutputText(payload.response);
  const parsed = extractJsonObject<RetinaAnalysisResult>(text);

  return {
    stageLabel: parsed.stageLabel || "Độ 0",
    riskLevel:
      parsed.riskLevel === "high" || parsed.riskLevel === "medium" ? parsed.riskLevel : "low",
    summary: parsed.summary || "Chưa có tóm tắt từ AI.",
    doctorAdvice: parsed.doctorAdvice || "Cần bác sĩ đối chiếu thêm với lâm sàng.",
    findings: Array.isArray(parsed.findings) ? parsed.findings.slice(0, 4) : [],
    confidenceScore: Math.min(Math.max(Number(parsed.confidenceScore || 0.5), 0), 1),
  };
}
