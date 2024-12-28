import { Card } from "@/components/ui/card";

interface SearchResultProps {
  title: string;
  url: string;
  description: string;
}

export const SearchResult = ({ title, url, description }: SearchResultProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-200 border-none bg-white/50 backdrop-blur-sm">
      <div className="flex flex-col">
        <div className="text-sm text-gray-600 mb-1">{url}</div>
        <a
          href={url}
          className="text-xl font-medium text-primary hover:text-primary-hover hover:underline mb-2 transition-colors duration-200"
        >
          {title}
        </a>
        <p className="text-gray-600">{description}</p>
      </div>
    </Card>
  );
};