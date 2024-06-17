export const getData = async (queryText: string) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${queryText}&apiKey=008b6b8ea2d94811a367b0e1be9066c4`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};
