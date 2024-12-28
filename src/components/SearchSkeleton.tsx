import { Card } from "@/components/ui/card";

export const SearchSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-4 border-none bg-white/50 backdrop-blur-sm">
          <div className="flex flex-col space-y-2">
            <div className="h-4 w-1/4 bg-orange-100 rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-orange-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-orange-100 rounded animate-pulse" />
          </div>
        </Card>
      ))}
    </div>
  );
};