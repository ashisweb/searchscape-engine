// Mock search suggestions based on query
export const getSearchSuggestions = async (query: string): Promise<string[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const suggestions = [
    "engine.online search",
    "engine.online features",
    "engine.online pricing",
    "engine.online documentation",
    "engine.online api",
    "engine.online tutorials",
  ].filter((suggestion) =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  return suggestions;
};

// Mock search results
export interface SearchResultType {
  title: string;
  url: string;
  description: string;
}

export const performSearch = async (query: string): Promise<SearchResultType[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const results: SearchResultType[] = [
    {
      title: `${query} - Engine.Online Search Results`,
      url: "https://engine.online/search",
      description: `Find the best results for ${query} using Engine.Online's powerful search technology.`,
    },
    {
      title: "Engine.Online Documentation",
      url: "https://engine.online/docs",
      description: "Comprehensive documentation and guides for using Engine.Online's features and APIs.",
    },
    {
      title: "Engine.Online Features",
      url: "https://engine.online/features",
      description: "Discover the powerful features that make Engine.Online the preferred choice for professional searching.",
    },
  ];

  return results;
};