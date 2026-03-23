import { NextResponse } from "next/server";
import {
  analyzeRetinaImage,
  getGeminiRuntimeConfig,
  hasGeminiApiKey,
  GeminiRequestError,
} from "@/shared/server/gemini";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.patientName || !body?.imageDataUrl) {
      return NextResponse.json(
        { error: "Missing patientName or imageDataUrl" },
        { status: 400 }
      );
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

    const analysis = await analyzeRetinaImage({
      patientName: body.patientName,
      patientCode: body.patientCode || null,
      screeningNote: body.screeningNote || null,
      historySummary: body.historySummary || null,
      imageDataUrl: body.imageDataUrl,
    });

    return NextResponse.json({
      analysis,
      ...getGeminiRuntimeConfig(),
    });
  } catch (error) {
    console.error("AI retina route failed:", error);
    if (error instanceof GeminiRequestError) {
      return NextResponse.json(
        {
          error: "AI retina upstream failed",
          detail: error.detail,
          ...getGeminiRuntimeConfig(),
        },
        { status: 502 }
      );
    }
    return NextResponse.json(
      {
        error: "AI retina request failed",
        detail: error instanceof Error ? error.message : "Unknown retina error",
      },
      { status: 500 }
    );
  }
}
