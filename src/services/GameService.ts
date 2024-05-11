export const updateComment = async (gameID, comment) => {
    return await fetch(`${import.meta.env.VITE_SERVER}/gamelog/updateComment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameID, comment }),
        credentials: "include",
      });  
}