import { NavigationBarHeight } from "@/data/constants/NavItems";
import Game from "../layouts/game/Game";
import "../layouts/pages/Play.css";
import { ColorTeam } from "@/data/enums/ChessEnums";
import { useEffect, useState } from "react";
import { initialBoard } from "@/data/constants/ChessConstants";
import Chat from "@/components/chat/Chat";
import { Board } from "@/data/models/Board";
import ReplayChessBoardController from "@/components/replay/ReplayChessBoardController";
import { Button } from "@/components/ui/button";

export function Replay() {
  const [boardOrientation, setBoardOrientation] = useState(ColorTeam.WHITE);
  const [newBoard, setNewBoard] = useState(initialBoard.clone());

  return (
    <main className="h-screen bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative flex flex-row gap-12 items-center justify-center">
      <div id="play" className="p-2 w-auto ">
			<ReplayChessBoardController
				boardOrientation={boardOrientation}
				chessboard={newBoard}
			/>
      </div>
    </main>
  );
}
