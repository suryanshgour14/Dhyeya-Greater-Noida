import { redirect } from "next/navigation";

// "My Purchases" now lives in the unified dashboard.
export default function PurchasesRedirect({
  params,
}: {
  params: { locale: string };
}) {
  redirect(`/${params.locale}/dashboard?tab=purchases`);
}
