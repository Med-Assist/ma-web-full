import { NextResponse } from "next/server";
import { getGeminiRuntimeConfig } from "@/shared/server/gemini";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(getGeminiRuntimeConfig());
}
