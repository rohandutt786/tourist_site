import { Metadata } from "next";
import PrivacyPolicy from "@/features/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy | Namoh Tourism",
  description: "Learn how Namoh Tourism collects, protects, and respects your personal travel information.",
};

export default function PrivacyPage() {
  return (
    <main>
      <PrivacyPolicy />
    </main>
  );
}
