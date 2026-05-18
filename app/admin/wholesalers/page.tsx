import { redirect } from "next/navigation";

export default function WholesalersRedirectPage() {
  redirect("/admin/providers");
}
