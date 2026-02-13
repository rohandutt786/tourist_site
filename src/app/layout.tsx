import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import NavbarClient from "./NavbarClient";
import { GlobalLoader } from "@/global/global-loader";
import Footer from "@/features/home/footer";

// Initialize Urbanist font
const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Namoh Tourism",
  description: "Tourism website built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="font-sans antialiased">
        {/* Navbar + Sidebar handled inside client wrapper */}
        <NextTopLoader
          color="#003566"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2563eb, 0 0 5px #2563eb"
        />
        <NavbarClient />
        <GlobalLoader>
          <main>{children}</main>
          <Toaster richColors position="bottom-right" />
        </GlobalLoader>
        <Footer />
      </body>
    </html>
  );
}
