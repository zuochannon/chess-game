export const getGameHistorySummary = async () => {
    return await fetch(`${import.meta.env.VITE_SERVER}/gamelog/summary`, {
        method: "GET",
        credentials: "include",
      })
      .then(response => {
        if (response.ok)
          return response.json();
  
        throw new Error('Not logged in. No game history available.');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}