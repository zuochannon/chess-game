import { ColorTeam } from "@/data/enums/ChessEnums";
import { Board } from "@/data/models/Board";
import ChessRulesController from "../../components/chessboard/ChessRulesController";
import "../pages/Play.css";
import { useEffect, useState } from "react";
import { archiveGame } from "@/services/GameService";

interface Props {
  offset: number;
  boardOrientation: ColorTeam;
  board: Board;
  onlineHandler: any;
}

function Game({ offset, boardOrientation, board, onlineHandler }: Props) {
  const [boardState, setBoardState] = useState<Board[]>([]);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  const updateBoardState = (newBoardState: Board) => {
    setBoardState((prevStates) => [...prevStates, newBoardState]);
  };

  useEffect(() => {
    if (boardState[boardState.length - 1]?.winningTeam) {
      console.log("Game has ended. Saving.");
      archiveGame(boardState, moveHistory);
    }
    console.log(boardState);
  }, [boardState, moveHistory]);

  const updateMoveHistory = (move: string) => {
    setMoveHistory((prevHistory) => [...prevHistory, move]);
  };

  const cleanMetadata = () => {
    setBoardState([]);
    setMoveHistory([]);
  };

  return (
    <div id="play" className="content-center">
      <ChessRulesController
        offset={offset}
        boardOrientation={boardOrientation}
        chessboard={board}
        onlineHandler={onlineHandler}
        updateBoardState={updateBoardState}
        moveHistory={moveHistory}
        updateMoveHistory={updateMoveHistory}
        cleanOnRestart={cleanMetadata}
      />
    </div>
  );
}

export default Game;
