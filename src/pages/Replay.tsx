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

import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getReplay } from "@/services/GameService";

const convertPiecesToClass = (pieces): ChessPiece[] =>
  pieces.map(
    (el) =>
      new ChessPiece(
        new Position(el.position.x, el.position.y),
        el.type,
        el.color,
        el.hasMoved
      )
  );

const createBoardList = (states): Board[] =>
  states.map((el) => new Board(convertPiecesToClass(el.pieces), el.totalTurns));

let test: Board[];
let boardStates;

export function Replay() {
  const { gameid } = useParams();

  useEffect(() => {
    boardStates = getReplay(gameid)
      .then((response) => response.json())
      .then((data) => {
        test = createBoardList(data.states);
      });
  }, [gameid]);

  const [boardOrientation, setBoardOrientation] = useState(ColorTeam.WHITE);
  const [index, setIndex] = useState(0);
  const [newBoard, setNewBoard] = useState<Board>(initialBoard.clone());

  const [paused, setPaused] = useState(true);

  const getNextState = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const getPrevState = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };

  const gotoStart = () => {
    setIndex(0);
  };

  const gotoEnd = () => {
    setIndex(test.length - 1);
  };

  useEffect(() => {
    if (test && test[index]) setNewBoard(test[index]);
  }, [index]);

  useEffect(() => {
    if (!paused) {
      const autoplay = setInterval(getNextState, 1000);
      return () => clearInterval(autoplay);
    }
  }, [paused]);

  return (
    <main className="h-screen bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative flex flex-col gap-4 items-center justify-center">
      <div id="play" className="p-2 w-auto">
        <div>
          <ReplayChessBoardController
            boardOrientation={boardOrientation}
            chessboard={newBoard}
          />
        </div>
      </div>
      <div className="flex flex-row w-fit items-center justify-center gap-16 text-white bg-black bg-opacity-50 p-4 rounded-full">
        <MdSkipPrevious onClick={gotoStart} className="cursor-pointer" />
        <GrLinkPrevious onClick={getPrevState} className="cursor-pointer" />
        {paused ? (
          <FaPlay onClick={() => setPaused(false)} className="cursor-pointer" />
        ) : (
          <FaStop onClick={() => setPaused(true)} className="cursor-pointer" />
        )}
        <GrLinkNext onClick={getNextState} className="cursor-pointer" />
        <MdSkipNext onClick={gotoEnd} className="cursor-pointer" />
      </div>
    </main>
  );
}
