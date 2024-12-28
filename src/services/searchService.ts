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
    // Since the Google Custom Search API requires valid credentials,
    // we'll return a graceful fallback for demonstration purposes
    return [
      {
        title: `Search results for "${query}"`,
        url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        description: "Click here to search on Google directly. To implement custom search, you'll need to set up Google Custom Search API credentials.",
      },
      {
        title: "How to set up Google Custom Search",
        url: "https://developers.google.com/custom-search/v1/introduction",
        description: "Learn how to create your own Custom Search API credentials and integrate them with this search engine.",
      }
    ];
  } catch (error) {
    console.error('Error performing search:', error);
    return [
      {
        title: `Search results for ${query}`,
        url: "https://www.google.com/search?q=" + encodeURIComponent(query),
        description: "We encountered an error while searching. Please try again or click here to search on Google directly.",
      }
    ];
  }
};