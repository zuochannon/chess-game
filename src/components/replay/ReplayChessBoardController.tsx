import { useEffect, useRef, useState } from "react";
import { initialBoard } from "../../data/constants/ChessConstants";
import { ColorTeam, PieceType } from "../../data/enums/ChessEnums";
import { Board } from "../../data/models/Board";
import { ChessPiece, Pawn } from "../../data/models/ChessPiece";
import { Position } from "../../data/models/Position";
import { generateMoveNotation } from "../ChessNotation/ChessNotation";
import {
  bishopMove,
  kingMove,
  knightMove,
  pawnMove,
  queenMove,
  rookMove,
} from "../chessrules";
import Chessboard from "./ChessBoard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ReplayChessBoard from "./ReplayChessBoard";

interface Props {
  offset: number;
  boardOrientation: ColorTeam;
  chessboard: Board;
  onlineHandler: any;
  updateBoardState: (board : Board) => void;
}

// Responsible for handling valid chess moves
export default function ReplayChessBoardController({
  offset,
  boardOrientation,
  chessboard,
  onlineHandler,
  updateBoardState,
}: Props) {
  const [board, setBoard] = useState<Board>(chessboard);
  const [promotionPawn, setPromotionPawn] = useState<ChessPiece>();
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [myTurn, setMyTurn] = useState(true);
  const [orientation, setOrientation] = useState<ColorTeam>(boardOrientation);
  const modalRef = useRef<HTMLDivElement>(null);
  const checkmateModalRef = useRef<HTMLDivElement>(null);
  const stalemateModalRef = useRef<HTMLDivElement>(null);

  function changeOrientation() {
    setOrientation((prevOrientation) =>
      prevOrientation === ColorTeam.WHITE ? ColorTeam.BLACK : ColorTeam.WHITE
    );
  }

  // Return Promotion Prompt
  return (
    <>
      {/* <div className="modal hidden" ref={checkmateModalRef}>
        <div className="modal-body">
          <div className="gameover-body">
            <span className="text-center">
              {" "}
              {board.winningTeam === ColorTeam.WHITE
                ? "White"
                : "Black"} wins!{" "}
            </span>
            <button
              onClick={
                onlineHandler
                  ? onlineHandler.restartGameLocal(restartGame)
                  : restartGame
              }
            >
              {" "}
              Play Again{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="modal hidden" ref={stalemateModalRef}>
        <div className="modal-body">
          <div className="gameover-body">
            <span className="text-center">
              {" "}
              {board.winningTeam === ColorTeam.DRAW ? "Draw!" : "Illegal"}{" "}
            </span>
            <button onClick={restartGame}> Play Again </button>
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="flex flex-col items-center justify-between py-10">
          <div className="turn-count-box">
            <label className="text-white turn-label">
              Turn: {board.totalTurns}
            </label>
          </div>
          <Button onClick={changeOrientation}>Change Orientation</Button>
        </div>
        <div className="chessboard-container">
          <ReplayChessBoard
            pieces={board.pieces}
            boardOrientation={orientation}
          />
        </div>
        <div className="move-history">
          <h3 className="text-center text-white p-2">PGN</h3>
          <div className="moves-container">
            {moveHistory.map((move, index) =>
              index % 2 === 0 ? (
                // Display both White and Black moves on the same line
                <span key={index} className="move-pair">
                  <span>
                    {Math.floor(index / 2) + 1}. {move}
                  </span>
                  {moveHistory[index + 1] && (
                    <span className="black-move">
                      {" "}
                      {moveHistory[index + 1]}
                    </span>
                  )}
                </span>
              ) : (
                // Add a line break after every black move
                <br key={index} />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
