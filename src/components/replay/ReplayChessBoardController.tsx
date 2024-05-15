import { ColorTeam } from "../../data/enums/ChessEnums";
import { Board } from "../../data/models/Board";
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

  // Return Promotion Prompt
  return (
    <>
        <div className="pointer-events-none">
          <ReplayChessBoard
            pieces={chessboard.pieces}
            boardOrientation={boardOrientation}
          />
        </div>
    </>
  );
}
