import { redirect } from "next/navigation";

export default async function WholesalerRedirectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/admin/providers/${id}`);
}
