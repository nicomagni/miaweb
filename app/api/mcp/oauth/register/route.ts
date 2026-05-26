import { registerOAuthClient } from "@/lib/mcp/oauth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return Response.json(
      {
        error: "invalid_client_metadata",
        error_description: "Expected JSON client metadata.",
      },
      { status: 400 },
    );
  }

  const result = await registerOAuthClient(payload);

  return Response.json(result.payload, {
    status: result.status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
