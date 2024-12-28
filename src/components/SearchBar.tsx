import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getSearchSuggestions } from "@/services/searchService";
import { useQuery } from "@tanstack/react-query";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export const SearchBar = ({ onSearch, initialQuery = "" }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ["suggestions", query],
    queryFn: () => getSearchSuggestions(query),
    enabled: query.length > 2,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    } else {
      toast({
        title: "Please enter a search term",
        variant: "destructive",
      });
    }
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search the web..."
          className="pl-10 pr-10 h-12 w-full rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 focus-visible:ring-1 focus-visible:ring-primary"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {showSuggestions && query.length > 2 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          {isLoading ? (
            <div className="p-4 text-gray-500">Loading suggestions...</div>
          ) : suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search className="h-4 w-4 mr-2 text-gray-400" />
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-gray-500">No suggestions found</div>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-center space-x-3">
        <Button
          type="submit"
          variant="secondary"
          className="bg-secondary hover:bg-secondary-hover text-gray-600"
        >
          Search
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="bg-secondary hover:bg-secondary-hover text-gray-600"
          onClick={() => {
            setQuery("I'm Feeling Lucky");
            onSearch("I'm Feeling Lucky");
          }}
        >
          I'm Feeling Lucky
        </Button>
      </div>
    </form>
  );
};