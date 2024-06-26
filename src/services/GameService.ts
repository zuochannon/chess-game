import { ColorTeam } from "@/data/enums/ChessEnums";
import { Board } from "@/data/models/Board";

export const updateComment = async (gameID : string, comment : string) => {
    return await fetch(`${import.meta.env.VITE_SERVER}/gamelog/updateComment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameID, comment }),
        credentials: "include",
      });  
}

export const archiveGame = async (gameID : string, state : Board[], pgn : string[]) => {
  return await fetch(`${import.meta.env.VITE_SERVER}/replay/archiveGame`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameID, state, pgn }),
    credentials: "include",
  }); 
}

export const getReplay = async (gameID : string) => {
  return await fetch(`${import.meta.env.VITE_SERVER}/replay/getReplay?gameid=${gameID}`);
}

export const getAnnotations = async (gameID : string) => {
  return await fetch(`${import.meta.env.VITE_SERVER}/annotate/getAnnotations?gameid=${gameID}`, {
    method: "GET",
    credentials: "include"
  });
}

export const addAnnotation = async (gameID : string, turn : number, pgn : string, annotation : string) => {
  return await fetch(`${import.meta.env.VITE_SERVER}/annotate/addAnnotation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameID, turn, pgn, annotation }),
    credentials: "include",
  }); 
}

export const addOfflineGame = async (winningteam : ColorTeam, turns : number, game_type : string) => {
  return await fetch(`${import.meta.env.VITE_SERVER}/gamelog/addOfflineGame`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ winningteam, turns, game_type }),
    credentials: "include",
  });  
}