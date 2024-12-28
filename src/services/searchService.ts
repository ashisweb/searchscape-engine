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
    const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key
    const searchEngineId = 'YOUR_SEARCH_ENGINE_ID'; // Replace with your actual Search Engine ID
    
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Search request failed');
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return [
        {
          title: `No results found for "${query}"`,
          url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
          description: "Try searching on Google directly.",
        }
      ];
    }

    return data.items.map((item: any) => ({
      title: item.title,
      url: item.link,
      description: item.snippet,
    }));

  } catch (error) {
    console.error('Error performing search:', error);
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
  }
};