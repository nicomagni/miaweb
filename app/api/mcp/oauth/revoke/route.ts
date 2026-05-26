import { authenticateOAuthClient, jsonResponse, revokeOAuthToken } from "@/lib/mcp/oauth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const client = await authenticateOAuthClient(formData);

  if (!client) {
    return jsonResponse(
      {
        error: "invalid_client",
        error_description: "Invalid OAuth client.",
      },
      { status: 401 },
    );
  }

  const token = String(formData.get("token") ?? "");

  if (token) {
    await revokeOAuthToken(token);
  }

  return new Response(null, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
