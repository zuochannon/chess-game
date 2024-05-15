import "../layouts/pages/Play.css";
import { ColorTeam } from "@/data/enums/ChessEnums";
import { useEffect, useRef, useState } from "react";
import { initialBoard } from "@/data/constants/ChessConstants";
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
import {
  addAnnotation,
  getAnnotations,
  getReplay,
} from "@/services/GameService";
import { toast as SonnerToast } from "sonner";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import ReplayAlert from "@/components/alerts/ReplayAlert";
import { useToast } from "@/components/ui/use-toast";

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

const convertToAnnotationKey = (index: number, pgn: string) =>
  `(${index},${pgn})`;

const convertKeyToString = (key : string) => {
  const regex = /^\((\d+),(\w+)\)/;

  const match = key.match(regex);

  if (match && match[1] && match[2]) {
      const turnNumber = parseInt(match[1]);
      const moveString = match[2];
      return `Turn ${turnNumber}. PGN Move ${moveString}`;
  } else {
      return null;
  }
};

const MAX_SPEED = 3;
const MIN_SPEED = 0.2;
const STEP_SPEED = 0.2;

export function Replay() {
  const { gameid } = useParams();

  const { toast } = useToast();

  const [boardOrientation, setBoardOrientation] = useState(ColorTeam.WHITE);
  const [index, setIndex] = useState(0);
  const [newBoard, setNewBoard] = useState<Board>(initialBoard.clone());

  const [replayPGN, setReplayPGN] = useState<string[]>([]);
  const [annotationKey, setAnnotationKey] = useState<string>("");

  const [paused, setPaused] = useState(true);

  const [speed, setSpeed] = useState(1);

  const [autostop, setAutostop] = useState(false);

  const inputCreateAnnotationRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const [ongoing, setOngoing] = useState(true);

  const [realTimeAnnotate, setRealTimeAnnotate] = useState(true);

  const [replayAnnotate, setReplayAnnotate] = useState({});

  function changeOrientation() {
    setBoardOrientation((prevOrientation) =>
      prevOrientation === ColorTeam.WHITE ? ColorTeam.BLACK : ColorTeam.WHITE
    );
  }

  const toggleCollapsible = () => {
    setIsOpen((prevState) => !prevState);
  };

  const saveAnnotation = (gameid, turn, movePGN, inputValue) => {
    addAnnotation(gameid, turn, movePGN, inputValue);
  };

  const handleCreateAnnotationSave = () => {
    if (index < gamePGN.length) {
      const inputValue = inputCreateAnnotationRef?.current.value;
      const turn = index;
      const movePGN = gamePGN[index - 1];
      annotations[convertToAnnotationKey(turn, movePGN)] = inputValue;
      saveAnnotation(gameid, turn, movePGN, inputValue);
    }

    toggleCollapsible();
  };

  const handleUpdateAnnotation = (turn, pgn, newAnnotation) => {
    annotations[convertToAnnotationKey(turn, pgn)] = newAnnotation;
    saveAnnotation(gameid, turn, pgn, newAnnotation);
  };

  const handleCreateAnnotationCancel = () => {
    toggleCollapsible();
  };

  useEffect(() => {
    getReplay(gameid)
      .then((response) => response.json())
      .then((data) => {
        fetchedBoard = createBoardList(data.pieces);
        fetchedBoard.shift();
        setNewBoard(fetchedBoard[0]);
        totalTurns = data.totalturns;
        winningTeam = data.winningteam;
        gamePGN = data.pgn;
      })
      .catch((err) => console.warn("Could not fetch replay."));

    getAnnotations(gameid)
      .then((response) => {
        if (response.ok) return response.json();
        annotations = {};
        toas;
      })
      .then((data) => {
        // Object.entries(data.annotations).forEach(([key, val]) => annotations[key] = val);
        annotations = data.annotations;
        console.log(annotations);
      })
      .catch((err) => {
        console.warn("No annotations are defined.");
        toast({
          variant: "destructive",
          title: "Please login to save your annotations.",
          description:
            "You are currently not logged in. Your annotations will not be saved.",
        });
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

    if (index < 0 || index > fetchedBoard.length) {
      setIndex(Math.max(0, Math.min(fetchedBoard.length, index)));
      return;
    }

    if (index === fetchedBoard.length) {
      setOngoing(false);
      return;
    }

    setOngoing(true);
    setReplayPGN(gamePGN.slice(0, index));
    setNewBoard(fetchedBoard[index]);
    setAnnotationKey(convertToAnnotationKey(index, gamePGN[index - 1]));
  }, [index]);

  useEffect(() => {
    if (!paused) {
      const autoplay = setInterval(getNextState, 1000 / speed);
      return () => clearInterval(autoplay);
    }
  }, [paused, speed]);

  useEffect(() => {
    if (!annotations || !annotations[annotationKey]) return;
    setReplayAnnotate(prevState => ({
      ...prevState,
      [annotationKey]: annotations[annotationKey],
    }))
  }, [annotationKey, annotations, realTimeAnnotate])

  useEffect(() => {
    if (!annotations) return;
    const annotate = annotations[annotationKey];
    if (annotate) {
      if (autostop) setPaused(true);

      const turn = index;
      const movePGN = gamePGN[index - 1];

      const current = `Turn ${turn}. PGN Move ${movePGN}`;

      SonnerToast(annotate, {
        description: current,
        action: {
          label: "Edit",
          onClick: () => {
            const newAnnotation = prompt(
              `Edit annotation on ${current}`,
              annotate
            );
            handleUpdateAnnotation(turn, movePGN, newAnnotation);
          },
        },
      });
    }
    console.log(annotations, annotationKey);
  }, [annotationKey]);

  return fetchedBoard ? (
    <main className="h-screen bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative flex flex-row gap-4 items-center justify-center">
      <div className="flex-2 flex-col flex m-8 px-8 py-6 justify-between h-[92%] bg-black bg-opacity-50 items-center w-fit rounded-2xl border-white border-2">
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

              <SelectItem
                key={gamePGN.length + 1}
                value={(gamePGN.length + 1).toString()}
              >
                End
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="text-white gap-5 flex flex-col">
          <h2>Speed: {speed}x</h2>
          <Button
            onClick={changeOrientation}
            variant="ghost"
            className="bg-white text-black bg-opacity-80"
          >
            Change Orientation
          </Button>
          <Collapsible open={isOpen}>
            <CollapsibleTrigger className="w-full">
              <Button
                className="w-full"
                onClick={() => {
                  toggleCollapsible();
                  if (autostop) setPaused(true);
                }}
              >
                Create Annotation
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-black bg-opacity-25 p-2 mt-2 border-white border-opacity-50 border-2 rounded-lg">
              <Textarea
                ref={inputCreateAnnotationRef}
                id="inputComment"
                placeholder="Enter annotation"
                className="my-4 text-black"
              />
              <div className="flex flex-row w-full justify-between">
                <Button
                  variant="secondary"
                  onClick={handleCreateAnnotationCancel}
                >
                  Cancel
                </Button>

                <Button type="submit" onClick={handleCreateAnnotationSave}>
                  Save
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <div className="flex items-center space-x-2">
            <Switch
              id="autostop"
              checked={autostop}
              onCheckedChange={(e) => setAutostop(e)}
            />
            <Label htmlFor="autostop" className="text-sm">
              Stop on Annotate
            </Label>
          </div>
        </div>
      </div>
      <div className="w-fit flex-1 flex flex-col items-center justify-center gap-4 py-2 px-6 h-fit bg-black bg-opacity-35 rounded-xl border-white border-2">
        <ReplayChessBoardController
          boardOrientation={boardOrientation}
          chessboard={newBoard}
        />
        {!ongoing && (
          <ReplayAlert
            title={(() => {
              switch (winningTeam) {
                case ColorTeam.WHITE:
                  return "White wins!";
                case ColorTeam.BLACK:
                  return "Black wins!";
                case ColorTeam.DRAW:
                  return "Draw!";
                default:
                  return "Illegal";
              }
            })()}
            desc="You've reached the end of the replay."
          />
        )}
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
      <div className="flex-col flex gap-6 m-8 justify-between h-[92%] items-center w-fit">
        <div
          className="flex-1 flex w-full px-8 py-6 flex-col gap-2 max-h-full overflow-y-auto overflow-x-hidden scrollbar bg-black bg-opacity-50 rounded-2xl border-white border-2"
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
              })}
            </TableBody>
          </Table>
        </div>
        <div
          className="text-white flex-1 flex w-full px-8 py-6 flex-col gap-2 max-h-full overflow-y-auto overflow-x-hidden scrollbar bg-black bg-opacity-50 rounded-2xl border-white border-2"
          style={{
            scrollbarColor: "#bf1841 transparent",
            scrollbarWidth: "thin",
          }}
        >
          <h2 className="text-center flex flex-col items-center justify-center gap-2">
            Annotations
            <div className="flex items-center space-x-2">
              <Switch
                id="realTimeAnnotate"
                checked={realTimeAnnotate}
                onCheckedChange={(e) => setRealTimeAnnotate(e)}
              />
              <Label htmlFor="realTimeAnnotate" className="text-base">
                Real-time
              </Label>
            </div>
          </h2>
          <div>
            {
            Object.entries(realTimeAnnotate ? replayAnnotate : annotations).map( ([key, val]) => {
              return <div><span className="font-semibold">{key}</span>: {val}</div>
            })
            }
          </div>
        </div>
      </div>
    </main>
  ) : (
    <h2 className="h-screen w-full flex flex-col items-center justify-center">
      Sorry! This replay is missing!
    </h2>
  );
}
