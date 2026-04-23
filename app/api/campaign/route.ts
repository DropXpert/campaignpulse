import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createCampaign } from "@/lib/campaign/service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createCampaign(body);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Invalid campaign input.",
          issues: error.flatten()
        },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Campaign generation failed.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
