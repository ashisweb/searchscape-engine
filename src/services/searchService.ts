// Mock search suggestions based on query
export const getSearchSuggestions = async (query: string): Promise<string[]> => {
  try {
    const response = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data[1] as string[];
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};

export interface SearchResultType {
  title: string;
  url: string;
  description: string;
}

export const performSearch = async (query: string): Promise<SearchResultType[]> => {
  try {
    // Since we don't have valid API credentials yet, we'll return helpful information
    // about setting up Google Custom Search
    return [
      {
        title: `Search results for "${query}"`,
        url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        description: "To implement custom search, you'll need to set up Google Custom Search API credentials. Click here to search on Google directly in the meantime.",
      },
      {
        title: "How to set up Google Custom Search",
        url: "https://developers.google.com/custom-search/v1/introduction",
        description: "1. Create a Google Cloud Project\n2. Enable Custom Search API\n3. Get API credentials\n4. Create a Custom Search Engine",
      },
      {
        title: "Get Google Custom Search API Key",
        url: "https://console.cloud.google.com/apis/credentials",
        description: "Visit the Google Cloud Console to create your API credentials for Custom Search.",
      }
    ];
  } catch (error) {
    console.error('Error performing search:', error);
    return [
      {
        title: `Search results for "${query}"`,
        url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        description: "We encountered an error while searching. Click here to search on Google directly.",
      }
    ];
  }
};