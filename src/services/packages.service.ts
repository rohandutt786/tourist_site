import content from "@/data/content.json";

export type ItineraryItem = {
  day: string;
  title: string;
  description: string;
};

export type DurationPlan = {
  duration: string;
  days: string;
  nights: string;
  plans?: {
    Cab?: ItineraryItem[];
    Volvo?: ItineraryItem[];
    [key: string]: ItineraryItem[] | undefined;
  };
  itinerary?: ItineraryItem[];
};

export type PackageType = {
  id: number;
  slug?: string;
  title: string;
  location: string;
  image: string;
  price?: string;
  description: string;
  facilities?: {
    transport?: string[];
    meal?: boolean;
    hotel?: boolean;
    tourImages?: string[];
    durationPlans?: DurationPlan[];
    itinerary?: any;
  };
};

export function getPackageSlug(pkg: PackageType): string {
  if (pkg.slug) return pkg.slug;
  return pkg.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getAllPackages(): PackageType[] {
  return (content.packages as PackageType[]).map((pkg) => ({
    ...pkg,
    slug: getPackageSlug(pkg),
  }));
}

export function getPackageBySlug(slug: string): PackageType | undefined {
  const all = getAllPackages();
  const decoded = decodeURIComponent(slug).toLowerCase();
  
  // Try exact slug match, id match, or derived slug match
  return all.find(
    (p) =>
      p.slug === decoded ||
      p.id.toString() === decoded ||
      getPackageSlug(p) === decoded
  );
}
