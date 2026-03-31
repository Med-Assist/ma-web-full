import { createSign } from "crypto";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

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

function decodeBase64Utf8(value: string) {
  try {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(normalized, "base64").toString("utf8");
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
  const encodedJson = process.env.OCR_GOOGLE_SERVICE_ACCOUNT_JSON_BASE64?.trim();
  const rawJson = process.env.OCR_GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  let jsonCredentialError: string | null = null;

  if (encodedJson || rawJson) {
    const decoded = encodedJson ? decodeBase64Utf8(encodedJson) : rawJson || "";

    if (!decoded) {
      jsonCredentialError = "Unable to decode OCR service account credential JSON.";
    } else {
      try {
        return parseCredentialFromJson(decoded, "OCR_GOOGLE_SERVICE_ACCOUNT_JSON(_BASE64)");
      } catch (error) {
        jsonCredentialError =
          error instanceof Error ? error.message : "Unable to parse OCR service account credential JSON.";
      }
    }
  }

  const credentialPath = (
    process.env.OCR_GOOGLE_APPLICATION_CREDENTIALS ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    ""
  ).trim();

  if (credentialPath) {
    const resolvedCredentialPath = resolve(credentialPath);
    if (!existsSync(resolvedCredentialPath)) {
      throw new Error(
        `OCR credential file does not exist at path: ${resolvedCredentialPath}.`
      );
    }

    const credentialRaw = readFileSync(resolvedCredentialPath, "utf8").trim();
    if (!credentialRaw) {
      throw new Error(`OCR credential file is empty at path: ${resolvedCredentialPath}.`);
    }

    return parseCredentialFromJson(credentialRaw, resolvedCredentialPath);
  }

  const email = process.env.OCR_GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = normalizePrivateKey(
    process.env.OCR_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim() || ""
  );

  if (email && privateKey) {
    return {
      project_id: process.env.OCR_GOOGLE_PROJECT_ID?.trim(),
      client_email: email,
      private_key: privateKey,
      token_uri: process.env.OCR_GOOGLE_TOKEN_URI?.trim() || DEFAULT_TOKEN_URI,
    };
  }

  if (jsonCredentialError) {
    throw new Error(
      `${jsonCredentialError} Set a valid OCR_GOOGLE_SERVICE_ACCOUNT_JSON(_BASE64), OCR_GOOGLE_APPLICATION_CREDENTIALS, or OCR_GOOGLE_SERVICE_ACCOUNT_EMAIL/PRIVATE_KEY.`
    );
  }

  throw new Error(
    "Missing OCR service account credential. Set OCR_GOOGLE_SERVICE_ACCOUNT_JSON(_BASE64), OCR_GOOGLE_APPLICATION_CREDENTIALS, or OCR_GOOGLE_SERVICE_ACCOUNT_EMAIL/PRIVATE_KEY."
  );
}

function getDocumentAiConfig(): DocumentAiConfig {
  const credential = parseServiceAccountCredentialFromEnv();
  const projectId = (
    process.env.OCR_GOOGLE_PROJECT_ID?.trim() ||
    credential.project_id ||
    ""
  ).trim();
  const location = (process.env.OCR_GOOGLE_LOCATION?.trim() || DEFAULT_LOCATION).trim();
  const processorId = (process.env.OCR_GOOGLE_PROCESSOR_ID?.trim() || "").trim();

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
  const location = (process.env.OCR_GOOGLE_LOCATION?.trim() || DEFAULT_LOCATION).trim();

  try {
    getDocumentAiConfig();
    return {
      provider: "google-document-ai",
      configured: true,
      location,
    };
  } catch {
    return {
      provider: "google-document-ai",
      configured: false,
      location,
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
