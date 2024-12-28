import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export const SearchBar = ({ onSearch, initialQuery = "" }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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