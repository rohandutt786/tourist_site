import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

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
        <NavbarClient />
        <GlobalLoader>
          <main>{children}</main>
        </GlobalLoader>
        <Footer />
      </body>
    </html>
  );
}
