import { Metadata } from "next";
import TermsAndConditions from "@/features/legal/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions | Namoh Tourism",
  description: "Read the booking policies, payment terms, and cancellation rules of Namoh Tourism.",
};

export default function TermsPage() {
  return (
    <main>
      <TermsAndConditions />
    </main>
  );
}
