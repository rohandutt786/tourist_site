import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-red-800">
          Welcome to Tourist Site
        </h1>
        <p className="text-gray-600">
          Discover the most beautiful places around the world.
        </p>
        {/* Shadcn UI Button */}
        <Button variant="default" size="lg">
          Explore Tourism
        </Button>
      </div>
    </main>
  );
}
