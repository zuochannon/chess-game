import { initialBoard } from "@/data/constants/ChessConstants";
import { ButtonOffset, NavigationBarHeight } from "@/data/constants/NavItems";
import { ColorTeam } from "@/data/enums/ChessEnums";
import { Board } from "@/data/models/Board"; // Ensure Board is imported
import { ChessPiece } from "@/data/models/ChessPiece";
import { Position } from "@/data/models/Position";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWhoAmIContext } from "../context/WhoAmIContext";
import Game from "../layouts/game/Game";
import "../layouts/pages/Play.css";
import PrivateChat from "@/components/chat/PrivateChat";

export function OnlinePlay() {
  const newBoard = initialBoard.clone();
  const [response, setResponse] = useState({
    status: -1,
    message: "",
    text: "",
  });
  const [color, setColor] = useState(ColorTeam.WHITE);
  const { roomid } = useParams();
  const { whoAmI } = useWhoAmIContext();
  const [moveHistory, setMoveHistory] = useState<any[]>([]);

  // Ensure Board is imported and used correctly
  const [boardState, setBoardState] = useState<Board[]>([]);

  const updateBoardState = (newBoardState: Board) => {
    setBoardState((prevStates) => [...prevStates, newBoardState]);
  };

  const onlineHandler = {
    restartGame: null,
    playMove: null,
    playMoveLocal: (playMove: any, myTurn: boolean) => {
      return (playedPiece: ChessPiece, dest: Position): boolean => {
        if (!myTurn) return false; // If it's not the player's turn, don't allow them to move any pieces

        let moveSuccess = playMove(playedPiece, dest); // Attempt to move the piece
        if (moveSuccess) {
          // If the move was successful, send the move to the server
          fetch(
            `${import.meta.env.VITE_SERVER}/onlinePlay/${roomid}/makeMove`,
            {
              method: "POST",
              credentials: "include",
              body: JSON.stringify({
                playedPiece: playedPiece,
                dest: dest,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          ).then(response => {
            if (response.ok) {
              console.log("Move sent to server successfully");
              setMoveHistory((prev) => [
                ...prev,
                { playedPiece: playedPiece, dest: dest },
              ]);
            } else {
              console.log("Failed to send move to server");
            }
          });
        }
        return moveSuccess;
      };
    },
    playMoveFromOnline: (
      playMove: any,
      playedPiece: ChessPiece,
      dest: Position
    ) => {
      playMove(playedPiece, dest);
    },
    restartGameLocal: (restartGame: any) => {
      // If any of the players choose to restart the game, send a request to the server to restart the game
      return () => {
        restartGame();
        fetch(
          `${import.meta.env.VITE_SERVER}/onlinePlay/${roomid}/restartGame`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      };
    },
    restartGameOnline: (restartGame: any) => {
      restartGame();
    },
  };

  useEffect(() => {
    // Fetch the moves from the server every 500ms
    const interval = setInterval(() => {
      fetch(`${import.meta.env.VITE_SERVER}/onlinePlay/${roomid}/getMoves`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);

          // Ensure that the moves are processed only if there are new moves
          if (data.moves.length > moveHistory.length) {
            let lastMove = data.moves[moveHistory.length];

            // Update the state of the game to reflect the move made by the other player
            lastMove.dest = new Position(lastMove.dest.x, lastMove.dest.y);
            lastMove.playedPiece.possibleMoves =
              lastMove.playedPiece.possibleMoves.map(
                (move: any) => new Position(move.x, move.y)
              );
            lastMove.playedPiece.position = new Position(
              lastMove.playedPiece.position.x,
              lastMove.playedPiece.position.y
            );
            onlineHandler.playMoveFromOnline(
              onlineHandler.playMove,
              lastMove.playedPiece,
              lastMove.dest
            );
            lastMove.playedPiece = new ChessPiece(
              lastMove.playedPiece.position,
              lastMove.playedPiece.type,
              lastMove.playedPiece.color,
              lastMove.playedPiece.hasMoved,
              lastMove.playedPiece.possibleMoves
            );
            setMoveHistory((prev) => [...prev, lastMove]);
          } else {
            console.log("No new moves");
          }
          if (moveHistory.length > data.moves.length) {
            // If the game is restarted, update the board to reflect it
            setMoveHistory([]);
            onlineHandler.restartGameOnline(onlineHandler.restartGame);
          }
        } else {
          console.log(`Error: ${response.status}`);
        }
      });
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [roomid, moveHistory, onlineHandler]);

  useEffect(() => {
    // Display the correct orientation of the board depending on who created the board and who joined the board
    async function run() {
      setResponse({ status: -1, message: "", text: "" });
      fetch(`${import.meta.env.VITE_SERVER}/onlinePlay/${roomid}/joinRoom`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ user: whoAmI }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        if (response.status == 200) {
          const responseBody = await response.json();
          setResponse({
            status: response.status,
            message: "Entered room",
            text: "test",
          });
          setColor(
            responseBody.color === "w" ? ColorTeam.WHITE : ColorTeam.BLACK
          );
        } else {
          setResponse({
            status: response.status,
            message: await response.text(),
            text: "test",
          });
        }
      });
    }
    run();
  }, [roomid, whoAmI]);

  const copyRoomIdToClipboard = () => {
    // Copy the room id to clipboard
    navigator.clipboard.writeText(roomid);
    alert("Room ID copied to clipboard!");
  };

  if (response.status == -1) {
    // Player waiting for opponent to join
    return (
      <main className="h-screen bg-black">
        <h1
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "50px",
          }}
        >
          Loading...
        </h1>
      </main>
    );
  } else if (response.status != 200) {
    // Unauthorized access
    return (
      <main className="h-screen bg-black">
        <h1
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "50px",
          }}
        >
          {response.message}
        </h1>
      </main>
    );
  } else {
    return (
      // Display chess board
      <main className="h-auto bg-black">
        <h1
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          room: {roomid}
        </h1>
        <button
          className="block mx-auto my-5 bg-gray-800 text-white px-4 py-2 rounded-md"
          onClick={copyRoomIdToClipboard}
        >
          Copy Room ID
        </button>
        <div className="h-full flex flex-row gap-12 items-center justify-center bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative">

        <div
          id="play"
          className="p-2"
          >
          <Game
            offset={NavigationBarHeight + ButtonOffset + 80}
            boardOrientation={color}
            board={newBoard}
            onlineHandler={onlineHandler}
            updateBoardState={updateBoardState}
            />
        </div>
        <div className="h-[75vh] w-1/4">
        <PrivateChat styles="overflow-y-auto h-full w-full bg-opacity-50" />
      </div>
            </div>
      </main>
    );
  }
}
