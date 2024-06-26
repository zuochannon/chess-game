import { useState } from 'react';
import { NavigationBarHeight } from "@/data/constants/NavItems";
import "../layouts/pages/Play.css";
import { ColorTeam } from "@/data/enums/ChessEnums";
import { initialBoard } from "@/data/constants/ChessConstants";
import Chat from "@/components/chat/Chat";
import OfflineGame from "@/layouts/game/OfflineGame";

export function Play() {
  const [boardOrientation, setBoardOrientation] = useState(ColorTeam.WHITE);
  const [newBoard, setNewBoard] = useState(initialBoard.clone());

  function changeOrientation() {
    setBoardOrientation((prevOrientation) =>
      prevOrientation !== ColorTeam.WHITE ? ColorTeam.BLACK : ColorTeam.WHITE
    );
  }

  function logNewBoardState() {
    console.log(newBoard);
  }

  return (
    <main className="h-screen bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative flex flex-row gap-12 items-center justify-center">
      <div className="items-center justify-center">
        <div className="hidden flex-row content-center">
          <button
            onClick={changeOrientation}
            className="p-2 rounded-sm bg-slate-500 text-white mr-2"
          >
            Change Orientation
          </button>
          <button
            onClick={logNewBoardState}
            className="p-2 rounded-sm bg-slate-500 text-white"
          >
            Log New Board State
          </button>
        </div>
      </div>
      <div id="play" className="p-2 w-auto">
        <OfflineGame
          offset={NavigationBarHeight}
          boardOrientation={boardOrientation}
          board={newBoard}
        />
      </div>
    </main>
  );
}
