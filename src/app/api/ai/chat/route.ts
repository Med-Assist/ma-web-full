import { NextResponse } from "next/server";
import {
  generateDashboardAssistantReply,
  getGeminiRuntimeConfig,
  hasGeminiApiKey,
  GeminiRequestError,
} from "@/shared/server/gemini";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.message || typeof body.message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    if (!hasGeminiApiKey()) {
      return NextResponse.json(
        {
          error: "Missing GEMINI_API_KEY",
          configured: false,
        },
        { status: 503 }
      );
    }

    const result = await generateDashboardAssistantReply(body.message, body.context || {});

    return NextResponse.json({
      ...result,
      ...getGeminiRuntimeConfig(),
    });
  } catch (error) {
    console.error("AI chat route failed:", error);
    if (error instanceof GeminiRequestError) {
      return NextResponse.json(
        {
          error: "AI chat upstream failed",
          detail: error.detail,
          ...getGeminiRuntimeConfig(),
        },
        { status: 502 }
      );
    }
    return NextResponse.json(
      {
        error: "AI chat request failed",
        detail: error instanceof Error ? error.message : "Unknown chat error",
      },
      { status: 500 }
    );
  }
}
