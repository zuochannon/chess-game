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
import { ChessPiece } from "@/data/models/ChessPiece";
import { Position } from "@/data/models/Position";

const convertPiecesToClass = (pieces) : ChessPiece[] => pieces.map(el => new ChessPiece( new Position(el.position.x, el.position.y), el.type, el.color, el.hasMoved ));

const createBoardList = (states) : Board[] => states.map(el => new Board(convertPiecesToClass(el.pieces), el.totalTurns));

export function Replay() {
  const test : Board[] = createBoardList(boardStates);
  
  const [boardOrientation, setBoardOrientation] = useState(ColorTeam.WHITE);
  const [index, setIndex] = useState(0);
  const [newBoard, setNewBoard] = useState<Board>(initialBoard.clone());

  const getNextState = (prevState) => {
    setIndex(prevIndex => prevIndex + 1);
    const nextState = test.length > index  ? test[index] : null;
    console.log(test.length)
    console.log(nextState);
    if (nextState) setNewBoard(test[index]);
  }

  return (
    <main className="h-screen bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative flex flex-row gap-12 items-center justify-center">
      <div id="play" className="p-2 w-auto">
        <Button onClick={getNextState} className="m-4">Next</Button>
			<ReplayChessBoardController
				boardOrientation={boardOrientation}
				chessboard={newBoard}
			/>
      </div>
    </main>
  );
}
