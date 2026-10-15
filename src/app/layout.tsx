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

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://namohtourism.com"
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Namoh Tourism | Tour Packages & Travel in India",
    template: "%s | Namoh Tourism",
  },
  description:
    "Explore beautiful destinations across India with Namoh Tourism. Handcrafted holiday packages, verified hotels & private cabs across Shimla, Manali, Kashmir, Rajasthan & All India.",
  keywords: [
    "Namoh Tourism",
    "Tour Packages India",
    "Shimla Manali Tour Packages",
    "Kashmir Tour Packages",
    "Rajasthan Holiday Packages",
    "Private Cab Booking Shimla",
    "Customised Trips India",
    "Himachal Travel Agency",
  ],
  authors: [{ name: "Namoh Tourism" }],
  creator: "Namoh Tourism",
  publisher: "Namoh Tourism",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Namoh Tourism",
    title: "Namoh Tourism | Handcrafted Tour Packages & Private Cabs Across India",
    description:
      "Explore India with Namoh Tourism. 100% customized holiday itineraries, verified hotels and private cabs across Shimla, Manali, Kashmir, Rajasthan, Uttarakhand, Kerala & All India.",
    images: [
      {
        url: "/images/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "Namoh Tourism - Handcrafted Tour Packages & Private Cabs Across India",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Namoh Tourism | Handcrafted Tour Packages & Private Cabs Across India",
    description:
      "Explore India with Namoh Tourism. 100% customized holiday itineraries, verified hotels and private cabs across Shimla, Manali, Kashmir, Rajasthan & All India.",
    images: ["/images/og-share.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/images/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/favicon-192.png",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/images/favicon-48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/images/favicon-96.png" type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/images/favicon-192.png" />
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
