import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SearchResult } from "@/components/SearchResult";
import { SearchSkeleton } from "@/components/SearchSkeleton";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  // Mock search results for demonstration
  const mockResults = [
    {
      title: "Engine.Online - Professional Search Engine",
      url: "https://engine.online",
      description:
        "Discover a modern search experience with Engine.Online. Fast, reliable, and accurate search results at your fingertips.",
    },
    {
      title: "Why Choose Engine.Online? - Features & Benefits",
      url: "https://engine.online/features",
      description:
        "Learn about the powerful features that make Engine.Online the preferred choice for professional searching needs.",
    },
    {
      title: "Engine.Online Blog - Search Technology Insights",
      url: "https://engine.online/blog",
      description:
        "Stay updated with the latest trends in search technology and discover tips to improve your search experience.",
    },
  ];

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setHasSearched(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (query === "error") {
      toast({
        title: "Search Error",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive",
      });
    }

    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col items-center ${
            hasSearched ? "py-6" : "py-32"
          } transition-all duration-300`}
        >
          {hasSearched && (
            <h1 className="text-4xl font-bold text-primary mb-6">
              Engine.Online
            </h1>
          )}
          <SearchBar onSearch={handleSearch} />
        </div>

        {hasSearched && (
          <div className="max-w-2xl mx-auto mt-8">
            {isSearching ? (
              <SearchSkeleton />
            ) : (
              <div className="space-y-6">
                {mockResults.map((result, index) => (
                  <SearchResult key={index} {...result} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;