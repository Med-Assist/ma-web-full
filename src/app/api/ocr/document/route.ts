import { NextResponse } from "next/server";
import {
  DocumentAiRequestError,
  getDocumentAiRuntimeConfig,
  getOcrMaxFileSizeBytes,
  isSupportedOcrMimeType,
  processDocumentWithDocumentAi,
} from "@/shared/server/document-ai";

export const runtime = "nodejs";

function getMimeTypeFromFilename(filename: string) {
  const normalized = filename.toLowerCase();
  if (normalized.endsWith(".pdf")) return "application/pdf";
  if (normalized.endsWith(".png")) return "image/png";
  if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) return "image/jpeg";
  if (normalized.endsWith(".tif") || normalized.endsWith(".tiff")) return "image/tiff";
  if (normalized.endsWith(".webp")) return "image/webp";
  if (normalized.endsWith(".txt")) return "text/plain";
  return "";
}

export async function POST(request: Request) {
  try {
    const runtimeConfig = getDocumentAiRuntimeConfig();
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file upload payload." }, { status: 400 });
    }

    const mimeType = (file.type || getMimeTypeFromFilename(file.name) || "").toLowerCase();

    if (!mimeType || !isSupportedOcrMimeType(mimeType)) {
      return NextResponse.json(
        {
          error: "Unsupported file format. Please upload PDF, image, or text file.",
          acceptedMimeTypes: [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/tiff",
            "image/webp",
            "text/plain",
          ],
        },
        { status: 415 }
      );
    }

    const maxFileSize = getOcrMaxFileSizeBytes();
    if (file.size > maxFileSize) {
      return NextResponse.json(
        {
          error: "File is too large for OCR processing.",
          maxFileSizeBytes: maxFileSize,
        },
        { status: 413 }
      );
    }

    if (mimeType.startsWith("text/")) {
      const text = (await file.text()).trim();
      return NextResponse.json({
        text,
        pageCount: 1,
        fileName: file.name,
        mimeType,
        source: "text-fallback",
        ...runtimeConfig,
      });
    }

    if (!runtimeConfig.configured) {
      return NextResponse.json(
        {
          error: "OCR service is not configured.",
          detail:
            runtimeConfig.reason ||
            "Set OCR_GOOGLE_PROJECT_ID, OCR_GOOGLE_PROCESSOR_ID, and service account credentials. On Vercel, prefer OCR_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 (or OCR_GOOGLE_SERVICE_ACCOUNT_JSON) instead of OCR_GOOGLE_APPLICATION_CREDENTIALS file paths.",
          ...runtimeConfig,
        },
        { status: 503 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const result = await processDocumentWithDocumentAi({
      bytes,
      mimeType,
    });

    return NextResponse.json({
      ...result,
      fileName: file.name,
      source: "document-ai",
      ...runtimeConfig,
    });
  } catch (error) {
    console.error("OCR document route failed:", error);
    const runtimeConfig = getDocumentAiRuntimeConfig();
    if (error instanceof DocumentAiRequestError) {
      return NextResponse.json(
        {
          error: "OCR upstream failed",
          detail: error.detail,
          ...runtimeConfig,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        error: "OCR request failed",
        detail: error instanceof Error ? error.message : "Unknown OCR error",
      },
      { status: 500 }
    );
  }
}
