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
import { getAnnotations, getReplay } from "@/services/GameService";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const convertPiecesToClass = (pieces): ChessPiece[] =>
  pieces.map(
    (el) =>
      new ChessPiece(
        new Position(el.position.x, el.position.y),
        el.type,
        el.color,
        false
      )
  );

const createBoardList = (pieces: ChessPiece[]): Board[] =>
  pieces.map(
    (el: ChessPiece, index: number) =>
      new Board(convertPiecesToClass(el), index - 1)
  );

let fetchedBoard: Board[];
let totalTurns = 0;
let winningTeam = "";
let gamePGN: string[] = [];
let annotations = {};

const MAX_SPEED = 3;
const MIN_SPEED = 0.2;
const STEP_SPEED = 0.2;

export function Replay() {
  const { gameid } = useParams();

  const [boardOrientation, setBoardOrientation] = useState(ColorTeam.WHITE);
  const [index, setIndex] = useState(0);
  const [newBoard, setNewBoard] = useState<Board>(initialBoard.clone());

  const [replayPGN, setReplayPGN] = useState<string[]>([]);
  const [currentAnnotation, setCurrentAnnotation] = useState<string>("");
  const [annotationKey, setAnnotationKey] = useState<string>("");

  const [paused, setPaused] = useState(true);

  const [speed, setSpeed] = useState(1);

  function changeOrientation() {
    setBoardOrientation((prevOrientation) =>
      prevOrientation === ColorTeam.WHITE ? ColorTeam.BLACK : ColorTeam.WHITE
    );
  }

  useEffect(() => {
    getReplay(gameid)
      .then((response) => response.json())
      .then((data) => {
        fetchedBoard = createBoardList(data.pieces);
        fetchedBoard.shift();
        setNewBoard(fetchedBoard[0]);
        totalTurns = data.totalturns;
        winningTeam = data.winningTeam;
        gamePGN = data.pgn;
      });

    getAnnotations(gameid)
      .then((response) => response.json())
      .then((data) => {
        // Object.entries(data.annotations).forEach(([key, val]) => annotations[key] = val);
        annotations = data.annotations;
        console.log(annotations);
      })
      .catch((err) => {
        console.warn("No annotations are defined.");
      });
  }, [gameid]);

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
    setIndex(fetchedBoard.length - 1);
  };

  useEffect(() => {
    if (!fetchedBoard) return;
    if (index < 0 || index >= fetchedBoard.length) {
      setIndex(Math.min(fetchedBoard.length - 1, Math.max(0, index)));
      return;
    }
    setReplayPGN(gamePGN.slice(0, index));
    setNewBoard(fetchedBoard[index]);
    setAnnotationKey(`(${index},${gamePGN[index - 1]})`);
  }, [index]);

  useEffect(() => {
    if (!paused) {
      const autoplay = setInterval(getNextState, 1000 / speed);
      return () => clearInterval(autoplay);
    }
  }, [paused, speed]);

  // useEffect(() => {
  //   setCurrentAnnotation(annotations[annotationKey]);
  // }, [annotationKey, currentAnnotation]);

  useEffect(() => {
    if (!annotations) return;
    const annotate = annotations[annotationKey];
    if (annotate) {
      toast(annotate, {
        description: `Turn ${index}. PGN Move ${gamePGN[index - 1]}`,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
    console.log(annotations, annotationKey);
  }, [annotationKey]);

  return (
    <main className="h-screen bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative flex flex-row gap-4 items-center justify-center">
      <div className="flex-2 flex-col flex m-8 px-8 py-6 justify-between h-5/6 bg-black bg-opacity-50 items-center w-fit rounded-2xl border-white border-2">
        <Select
          value={index.toString()}
          onValueChange={(e) => setIndex(parseInt(e))}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder={`Turn ${index}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={0} value={"0"}>
                Turn 0
              </SelectItem>

              {gamePGN.map((el, index) => {
                return (
                  <SelectItem key={index + 1} value={(index + 1).toString()}>
                    Turn {index + 1}: {el}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="text-white gap-4 flex flex-col">
          <h2>Speed: {speed}x</h2>
          <Button onClick={changeOrientation} variant="default">
            Change Orientation
          </Button>
        </div>
      </div>
      <div className="w-fit flex-1 flex flex-col items-center justify-center gap-4 py-2 px-6 h-fit bg-black bg-opacity-35 rounded-xl border-white border-2">
        <ReplayChessBoardController
          boardOrientation={boardOrientation}
          chessboard={newBoard}
        />
        <div className="h-fit w-fit flex flex-col gap-4 text-white bg-black bg-opacity-50 p-4 rounded-3xl">
          <div className="flex flex-row w-fit items-center justify-center gap-16">
            <MdSkipPrevious onClick={gotoStart} className="cursor-pointer" />
            <GrLinkPrevious onClick={getPrevState} className="cursor-pointer" />
            {paused ? (
              <FaPlay
                onClick={() => setPaused(false)}
                className="cursor-pointer"
              />
            ) : (
              <FaStop
                onClick={() => setPaused(true)}
                className="cursor-pointer"
              />
            )}
            <GrLinkNext onClick={getNextState} className="cursor-pointer" />
            <MdSkipNext onClick={gotoEnd} className="cursor-pointer" />
          </div>
          {!paused && (
            <Slider
              defaultValue={[speed]}
              onValueChange={(e) => setSpeed(e[0])}
              min={MIN_SPEED}
              max={MAX_SPEED}
              step={STEP_SPEED}
            />
          )}
        </div>
      </div>
      <div className="flex-col flex m-8 px-8 py-6 justify-between h-5/6 bg-black bg-opacity-50 items-center w-fit rounded-2xl border-white border-2">
        <div
          className="flex w-full flex-col gap-2 max-h-full overflow-y-auto overflow-x-hidden scrollbar"
          style={{
            scrollbarColor: "#bf1841 transparent",
            scrollbarWidth: "thin",
          }}
        >
          <h2 className="text-white text-center">PGN</h2>
          <Table className=" text-white">
            <TableHeader className="flex flex-row items-center justify-center">
              <TableRow>
                <TableHead className="text-white font-semibold">Turn</TableHead>
                <TableHead className="text-white font-semibold">
                  White
                </TableHead>
                <TableHead className="text-white font-semibold">
                  Black
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {replayPGN.map((_, index) => {
                return (
                  index % 2 === 0 && (
                    <TableRow className="flex flex-row justify-evenly">
                      <TableCell>{Math.ceil(index / 2) + 1}</TableCell>
                      <TableCell>{replayPGN[index]}</TableCell>
                      <TableCell>{replayPGN[index + 1]}</TableCell>
                    </TableRow>
                  )
                );

                // console.log(move, index)
                // return <TableRow className="flex flex-row justify-evenly">
                //   <TableCell>{Math.ceil(index / 2) + (index % 2 === 0 ? 1 : 0)}</TableCell>
                //   <TableCell>{move}</TableCell>
                //   <TableCell>{replayPGN[index+1]}</TableCell>
                // </TableRow>
              })}
              {/* <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow> */}
            </TableBody>
          </Table>
          {/* {replayPGN.map((move, index) =>
                index % 2 === 0 ? (
                  // Display both White and Black moves on the same line
                  <span key={index} className="move-pair">
                    <span>
                      {Math.floor(index / 2) + 1}. {move}
                    </span>
                    {replayPGN[index + 1] && (
                      <span className="black-move">
                        {" "}
                        {replayPGN[index + 1]}
                      </span>
                    )}
                  </span>
                ) : (
                  // Add a line break after every black move
                  <br key={index} />
                )
              )} */}
        </div>
      </div>
    </main>
  );
}
