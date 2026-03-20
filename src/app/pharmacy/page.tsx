import { redirect } from "next/navigation";

export default function LegacyPharmacyPage() {
  redirect("/dashboard/pharmacy");
}
