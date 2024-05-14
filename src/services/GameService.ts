import { Board } from "@/data/models/Board";

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

export const archiveGame = async (state : Board[]) => {
  return await fetch(`${import.meta.env.VITE_SERVER}/replay/archiveGame`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ state }),
    credentials: "include",
  }); 
}

export const getReplay = async (gameID : string) => {
  return await fetch(`${import.meta.env.VITE_SERVER}/replay/getReplay?gameid=${gameID}`);
}