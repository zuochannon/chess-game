import { useRef, useState } from "react";
import { ColorTeam } from "../../data/enums/ChessEnums";
import { Board } from "../../data/models/Board";
import { ChessPiece } from "../../data/models/ChessPiece";
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
  boardOrientation,
  chessboard,
}: Props) {
  const [board, setBoard] = useState<Board>(chessboard);
  const [promotionPawn, setPromotionPawn] = useState<ChessPiece>();
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [myTurn, setMyTurn] = useState(true);
  const [orientation, setOrientation] = useState<ColorTeam>(boardOrientation);
  const modalRef = useRef<HTMLDivElement>(null);
  const checkmateModalRef = useRef<HTMLDivElement>(null);
  const stalemateModalRef = useRef<HTMLDivElement>(null);

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
        <div className="pointer-events-none">
          <ReplayChessBoard
            pieces={chessboard.pieces}
            boardOrientation={boardOrientation}
          />
        </div>
    </>
  );
}
