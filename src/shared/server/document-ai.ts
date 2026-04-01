import { createSign } from "crypto";
import { existsSync, readFileSync } from "fs";

const DEFAULT_LOCATION = "asia-southeast1";
const DEFAULT_MAX_FILE_SIZE_MB = 12;
const DEFAULT_TOKEN_URI = "https://oauth2.googleapis.com/token";
const OAUTH_SCOPE = "https://www.googleapis.com/auth/cloud-platform";
const JWT_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:jwt-bearer";

type ServiceAccountCredential = {
  project_id?: string;
  client_email: string;
  private_key: string;
  token_uri?: string;
};

type DocumentAiConfig = {
  projectId: string;
  location: string;
  processorId: string;
  tokenUri: string;
  serviceAccountEmail: string;
  serviceAccountPrivateKey: string;
};

type AccessTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

type ProcessDocumentParams = {
  bytes: Buffer;
  mimeType: string;
};

export type ProcessDocumentResult = {
  text: string;
  pageCount: number;
  mimeType: string;
  provider: "google-document-ai";
};

export class DocumentAiRequestError extends Error {
  status: number;
  detail: string;

  constructor(message: string, status: number, detail?: string) {
    super(message);
    this.name = "DocumentAiRequestError";
    this.status = status;
    this.detail = detail || message;
  }
}

let cachedToken:
  | {
      accessToken: string;
      expiresAtEpochMs: number;
    }
  | null = null;

function stripWrappingQuotes(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  const hasDoubleQuotes = trimmed.startsWith('"') && trimmed.endsWith('"');
  const hasSingleQuotes = trimmed.startsWith("'") && trimmed.endsWith("'");
  if (hasDoubleQuotes || hasSingleQuotes) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function readEnvValue(keys: string[]) {
  for (const key of keys) {
    const value = stripWrappingQuotes(process.env[key] || "");
    if (value) {
      return value;
    }
  }
  return "";
}

function readProjectIdFromEnv() {
  return readEnvValue(["OCR_GOOGLE_PROJECT_ID", "GOOGLE_CLOUD_PROJECT", "GCP_PROJECT"]);
}

function readProcessorIdFromEnv() {
  return readEnvValue(["OCR_GOOGLE_PROCESSOR_ID", "DOCUMENT_AI_PROCESSOR_ID"]);
}

function readLocationFromEnv() {
  return readEnvValue(["OCR_GOOGLE_LOCATION", "DOCUMENT_AI_LOCATION"]) || DEFAULT_LOCATION;
}

function readTokenUriFromEnv() {
  return readEnvValue(["OCR_GOOGLE_TOKEN_URI"]) || DEFAULT_TOKEN_URI;
}

function detectCredentialInputMode() {
  if (readEnvValue(["OCR_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64", "GOOGLE_SERVICE_ACCOUNT_JSON_BASE64"])) {
    return "json_base64" as const;
  }

  if (readEnvValue(["OCR_GOOGLE_SERVICE_ACCOUNT_JSON", "GOOGLE_SERVICE_ACCOUNT_JSON"])) {
    return "json" as const;
  }

  if (readEnvValue(["OCR_GOOGLE_APPLICATION_CREDENTIALS", "GOOGLE_APPLICATION_CREDENTIALS"])) {
    return "file_path" as const;
  }

  const email = readEnvValue(["OCR_GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_SERVICE_ACCOUNT_EMAIL"]);
  const privateKey = readEnvValue([
    "OCR_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
    "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
  ]);
  if (email && privateKey) {
    return "email_private_key" as const;
  }

  return "none" as const;
}

function decodeBase64Utf8(value: string) {
  try {
    const normalized = value
      .replace(/\s+/g, "")
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    if (!normalized) {
      return "";
    }

    const paddingLength = normalized.length % 4;
    const padded =
      paddingLength === 0 ? normalized : `${normalized}${"=".repeat(4 - paddingLength)}`;
    return Buffer.from(padded, "base64").toString("utf8");
  } catch {
    return "";
  }
}

function normalizePrivateKey(value: string) {
  return value.replace(/\\n/g, "\n");
}

function parseCredentialFromJson(rawJson: string, sourceLabel: string): ServiceAccountCredential {
  let parsed: ServiceAccountCredential;

  try {
    parsed = JSON.parse(rawJson) as ServiceAccountCredential;
  } catch {
    throw new Error(`OCR service account credential from ${sourceLabel} is not valid JSON.`);
  }

  const clientEmail = parsed.client_email?.trim();
  const privateKey = normalizePrivateKey(parsed.private_key?.trim() || "");

  if (!clientEmail || !privateKey) {
    throw new Error(`OCR service account credential from ${sourceLabel} is missing client_email/private_key.`);
  }

  return {
    project_id: parsed.project_id?.trim(),
    client_email: clientEmail,
    private_key: privateKey,
    token_uri: parsed.token_uri?.trim() || DEFAULT_TOKEN_URI,
  };
}

function parseServiceAccountCredentialFromEnv(): ServiceAccountCredential {
  const encodedJson = readEnvValue([
    "OCR_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64",
    "GOOGLE_SERVICE_ACCOUNT_JSON_BASE64",
  ]);
  const rawJson = readEnvValue(["OCR_GOOGLE_SERVICE_ACCOUNT_JSON", "GOOGLE_SERVICE_ACCOUNT_JSON"]);
  const jsonErrors: string[] = [];
  let pathCredentialError: string | null = null;

  const jsonCandidates: Array<{ label: string; value: string; isBase64: boolean }> = [];
  if (encodedJson) {
    jsonCandidates.push({
      label: "OCR_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64",
      value: encodedJson,
      isBase64: true,
    });
  }
  if (rawJson) {
    jsonCandidates.push({
      label: "OCR_GOOGLE_SERVICE_ACCOUNT_JSON",
      value: rawJson,
      isBase64: false,
    });
  }

  for (const candidate of jsonCandidates) {
    let normalizedJson = candidate.value;
    if (candidate.isBase64) {
      if (!candidate.value.startsWith("{")) {
        normalizedJson = decodeBase64Utf8(candidate.value);
      }
      if (!normalizedJson) {
        jsonErrors.push(`Unable to decode credential JSON from ${candidate.label}.`);
        continue;
      }
    }

    try {
      return parseCredentialFromJson(normalizedJson, candidate.label);
    } catch (error) {
      jsonErrors.push(error instanceof Error ? error.message : `Unable to parse ${candidate.label}.`);
    }
  }

  const credentialPath = readEnvValue([
    "OCR_GOOGLE_APPLICATION_CREDENTIALS",
    "GOOGLE_APPLICATION_CREDENTIALS",
  ]);

  if (credentialPath) {
    const resolvedCredentialPath = credentialPath;
    if (existsSync(/*turbopackIgnore: true*/ resolvedCredentialPath)) {
      const credentialRaw = readFileSync(/*turbopackIgnore: true*/ resolvedCredentialPath, "utf8").trim();
      if (!credentialRaw) {
        pathCredentialError = "OCR credential file is empty.";
      } else {
        try {
          return parseCredentialFromJson(credentialRaw, resolvedCredentialPath);
        } catch (error) {
          pathCredentialError =
            error instanceof Error ? error.message : "Unable to parse OCR credential file.";
        }
      }
    } else {
      pathCredentialError = "OCR credential file path is invalid or unavailable in this environment.";
    }
  }

  const email = readEnvValue(["OCR_GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_SERVICE_ACCOUNT_EMAIL"]);
  const privateKey = normalizePrivateKey(
    readEnvValue([
      "OCR_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
      "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
    ])
  );

  if (email && privateKey) {
    return {
      project_id: readProjectIdFromEnv(),
      client_email: email,
      private_key: privateKey,
      token_uri: readTokenUriFromEnv(),
    };
  }

  if (jsonErrors.length > 0) {
    throw new Error(
      `${jsonErrors.join(" ")} Set a valid OCR_GOOGLE_SERVICE_ACCOUNT_JSON(_BASE64), OCR_GOOGLE_SERVICE_ACCOUNT_JSON, OCR_GOOGLE_APPLICATION_CREDENTIALS, or OCR_GOOGLE_SERVICE_ACCOUNT_EMAIL/PRIVATE_KEY. On Vercel, prefer OCR_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 or OCR_GOOGLE_SERVICE_ACCOUNT_JSON.`
    );
  }

  if (pathCredentialError) {
    throw new Error(
      `${pathCredentialError} Set OCR_GOOGLE_SERVICE_ACCOUNT_JSON(_BASE64) or OCR_GOOGLE_SERVICE_ACCOUNT_EMAIL/PRIVATE_KEY instead. On Vercel, do not use OCR_GOOGLE_APPLICATION_CREDENTIALS file paths.`
    );
  }

  throw new Error(
    "Missing OCR service account credential. Set OCR_GOOGLE_SERVICE_ACCOUNT_JSON(_BASE64), OCR_GOOGLE_SERVICE_ACCOUNT_JSON, OCR_GOOGLE_APPLICATION_CREDENTIALS, or OCR_GOOGLE_SERVICE_ACCOUNT_EMAIL/PRIVATE_KEY. On Vercel, prefer OCR_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64."
  );
}

function getDocumentAiConfig(): DocumentAiConfig {
  const credential = parseServiceAccountCredentialFromEnv();
  const projectId = (
    readProjectIdFromEnv() ||
    credential.project_id ||
    ""
  ).trim();
  const location = readLocationFromEnv().trim();
  const processorId = readProcessorIdFromEnv().trim();

  if (!projectId) {
    throw new Error("Missing OCR_GOOGLE_PROJECT_ID.");
  }

  if (!processorId) {
    throw new Error("Missing OCR_GOOGLE_PROCESSOR_ID.");
  }

  return {
    projectId,
    location,
    processorId,
    tokenUri: credential.token_uri?.trim() || DEFAULT_TOKEN_URI,
    serviceAccountEmail: credential.client_email,
    serviceAccountPrivateKey: credential.private_key,
  };
}

export function getDocumentAiRuntimeConfig() {
  const location = readLocationFromEnv().trim();
  const hasProjectId = Boolean(readProjectIdFromEnv());
  const hasProcessorId = Boolean(readProcessorIdFromEnv());
  const credentialInput = detectCredentialInputMode();

  try {
    getDocumentAiConfig();
    return {
      provider: "google-document-ai",
      configured: true,
      location,
      hasProjectId,
      hasProcessorId,
      credentialInput,
    };
  } catch (error) {
    return {
      provider: "google-document-ai",
      configured: false,
      location,
      hasProjectId,
      hasProcessorId,
      credentialInput,
      reason: error instanceof Error ? error.message : "Unknown OCR configuration error.",
    };
  }
}

export function hasDocumentAiConfig() {
  return getDocumentAiRuntimeConfig().configured;
}

export function getOcrMaxFileSizeBytes() {
  const parsed = Number(process.env.OCR_MAX_FILE_SIZE_MB || DEFAULT_MAX_FILE_SIZE_MB);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_MAX_FILE_SIZE_MB * 1024 * 1024;
  }

  return Math.round(parsed * 1024 * 1024);
}

export function isSupportedOcrMimeType(mimeType: string) {
  const normalized = mimeType.toLowerCase();

  return (
    normalized === "application/pdf" ||
    normalized === "image/jpeg" ||
    normalized === "image/jpg" ||
    normalized === "image/png" ||
    normalized === "image/tiff" ||
    normalized === "image/webp" ||
    normalized.startsWith("text/")
  );
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function extractErrorDetail(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    const detail = parsed?.error?.message;
    if (typeof detail === "string" && detail.trim()) {
      return detail.trim();
    }
  } catch {
    // Fall through and return raw.
  }

  return raw;
}

function createSignedJwt(config: DocumentAiConfig) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + 3600;

  const header = base64UrlEncode(
    JSON.stringify({
      alg: "RS256",
      typ: "JWT",
    })
  );
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: config.serviceAccountEmail,
      scope: OAUTH_SCOPE,
      aud: config.tokenUri,
      iat: issuedAt,
      exp: expiresAt,
    })
  );
  const unsignedToken = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");

  signer.update(unsignedToken);
  signer.end();

  const signature = signer.sign(config.serviceAccountPrivateKey, "base64url");
  return `${unsignedToken}.${signature}`;
}

async function getGoogleAccessToken(config: DocumentAiConfig) {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAtEpochMs > now + 60_000) {
    return cachedToken.accessToken;
  }

  const assertion = createSignedJwt(config);
  const tokenResponse = await fetch(config.tokenUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: JWT_GRANT_TYPE,
      assertion,
    }).toString(),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    const raw = await tokenResponse.text();
    throw new DocumentAiRequestError(
      `Google OAuth token request failed with status ${tokenResponse.status}`,
      tokenResponse.status,
      extractErrorDetail(raw)
    );
  }

  const payload = (await tokenResponse.json()) as AccessTokenResponse;
  const expiresIn = Number(payload.expires_in || 3600);
  cachedToken = {
    accessToken: payload.access_token,
    expiresAtEpochMs: now + Math.max(1, expiresIn - 60) * 1000,
  };

  return payload.access_token;
}

export async function processDocumentWithDocumentAi(
  params: ProcessDocumentParams
): Promise<ProcessDocumentResult> {
  const config = getDocumentAiConfig();
  const accessToken = await getGoogleAccessToken(config);
  const endpoint = `https://${config.location}-documentai.googleapis.com/v1/projects/${config.projectId}/locations/${config.location}/processors/${config.processorId}:process`;
  const requestBody = {
    rawDocument: {
      content: params.bytes.toString("base64"),
      mimeType: params.mimeType,
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    cache: "no-store",
  });

  if (!response.ok) {
    const raw = await response.text();
    throw new DocumentAiRequestError(
      `Document AI request failed with status ${response.status}`,
      response.status,
      extractErrorDetail(raw)
    );
  }

  const payload = (await response.json()) as {
    document?: {
      text?: string;
      pages?: unknown[];
    };
  };
  const text = payload?.document?.text?.trim() || "";
  const pages = Array.isArray(payload?.document?.pages) ? payload.document.pages : [];

  return {
    text,
    pageCount: pages.length,
    mimeType: params.mimeType,
    provider: "google-document-ai",
  };
}
