import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPackages, getPackageBySlug } from "@/services/packages.service";
import PackageDetailFeature from "@/features/packages/package-detail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const packages = getAllPackages();
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    return {
      title: "Package Not Found | Namoh Tourism",
    };
  }

  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://namohtourism.com"
  ).replace(/\/$/, "");

  const title = `${pkg.title} Tour Package | Namoh Tourism`;
  const description = `Book ${pkg.title} in ${pkg.location} with dedicated private mountain cab, verified hotel stays, daily meals, and 24/7 coordinator assistance. 100% customized tour package by Namoh Tourism.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/packages/${pkg.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${baseUrl}/packages/${pkg.slug}`,
      siteName: "Namoh Tourism",
      title,
      description,
      images: [
        {
          url: pkg.image,
          alt: `${pkg.title} Tour Package`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [pkg.image],
    },
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  return <PackageDetailFeature pkg={pkg} />;
}
