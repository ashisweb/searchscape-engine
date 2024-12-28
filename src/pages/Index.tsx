import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SearchResult } from "@/components/SearchResult";
import { SearchSkeleton } from "@/components/SearchSkeleton";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { performSearch, type SearchResultType } from "@/services/searchService";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => performSearch(searchQuery),
    enabled: !!searchQuery,
    onError: () => {
      toast({
        title: "Search Error",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
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
          <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        </div>

        {hasSearched && (
          <div className="max-w-2xl mx-auto mt-8">
            {isLoading ? (
              <SearchSkeleton />
            ) : (
              <div className="space-y-6">
                {searchResults?.map((result: SearchResultType, index: number) => (
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