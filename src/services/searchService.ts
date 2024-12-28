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
    // Using the SerpApi alternative - Custom Search JSON API
    const apiKey = 'AIzaSyDwxR053q8P96LlPLvJkzlxFLYeqe5qZ9Q'; // This is a public API key for demonstration
    const searchEngineId = '69c5896c7c8294c1b'; // This is a public Search Engine ID for demonstration
    
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Search request failed');
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      title: item.title,
      url: item.link,
      description: item.snippet,
    }));
  } catch (error) {
    console.error('Error performing search:', error);
    // Return some fallback results in case of error
    return [
      {
        title: `Search results for ${query}`,
        url: "https://www.google.com/search?q=" + encodeURIComponent(query),
        description: "We encountered an error while searching. Please try again or click here to search on Google directly.",
      }
    ];
  }
};