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
  title: "Namoh Tourism | Tour Packages & Travel",
  description: "Explore the best tour packages across India with Namoh Tourism.",
  icons: {
    icon: "/images/namoh_emblem.svg",
    apple: "/images/namoh_emblem.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={urbanist.variable}>
      <head>
        <link rel="icon" href="/images/namoh_emblem.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/images/namoh_emblem.svg" />
      </head>
      <body className="font-sans antialiased text-slate-800 bg-white">
        {/* Navbar + Sidebar handled inside client wrapper */}
        <NextTopLoader
          color="#002855"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #d4af37, 0 0 5px #d4af37"
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
