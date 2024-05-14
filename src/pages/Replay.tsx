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

const boardStates = [
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 6,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 2
                  },
                  {
                      "x": 3,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 2
                  },
                  {
                      "x": 4,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 2
                  },
                  {
                      "x": 6,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 2
                  },
                  {
                      "x": 7,
                      "y": 3
                  }
              ],
              "hasMoved": false
          }
      ],
      "totalTurns": 1,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 6,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 2
                  },
                  {
                      "x": 3,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 2
                  },
                  {
                      "x": 4,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 2
                  },
                  {
                      "x": 6,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 2
                  },
                  {
                      "x": 7,
                      "y": 3
                  }
              ],
              "hasMoved": false
          }
      ],
      "totalTurns": 1,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 6,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 5
                  },
                  {
                      "x": 4,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 5
                  },
                  {
                      "x": 6,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 5
                  },
                  {
                      "x": 7,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": true
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          }
      ],
      "totalTurns": 2,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 6,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 1
                  },
                  {
                      "x": 7,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": true
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 2
                  },
                  {
                      "x": 3,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 2
                  },
                  {
                      "x": 4,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 4
                  },
                  {
                      "x": 7,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 2
                  },
                  {
                      "x": 7,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          }
      ],
      "totalTurns": 3,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 6,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 5
                  },
                  {
                      "x": 4,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 5
                  },
                  {
                      "x": 6,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  },
                  {
                      "x": 6,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 4,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 6,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": true
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 2
                  },
                  {
                      "x": 3,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 2
                  },
                  {
                      "x": 4,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 5,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 6,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 5
                  },
                  {
                      "x": 4,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  },
                  {
                      "x": 6,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": true
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 6,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 6,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 1
                  },
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 3,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 3
                  },
                  {
                      "x": 1,
                      "y": 4
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 2
                  },
                  {
                      "x": 4,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": true
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 2
                  },
                  {
                      "x": 3,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 7,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 5,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 5
                  },
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 4
                  },
                  {
                      "x": 1,
                      "y": 3
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 6,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 4,
                      "y": 6
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  },
                  {
                      "x": 6,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": true
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 8,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 5,
                  "y": 5
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 1
                  },
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 1
                  },
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 3,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 2
                  },
                  {
                      "x": 4,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 2
                  },
                  {
                      "x": 3,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 9,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 5
                  },
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 4
                  },
                  {
                      "x": 1,
                      "y": 3
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 5,
                  "y": 5
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 7
                  },
                  {
                      "x": 6,
                      "y": 3
                  },
                  {
                      "x": 4,
                      "y": 3
                  },
                  {
                      "x": 7,
                      "y": 6
                  },
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 5
                  },
                  {
                      "x": 6,
                      "y": 7
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  },
                  {
                      "x": 6,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 10,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 3,
                  "y": 4
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 2,
                      "y": 1
                  },
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 5,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 1
                  },
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 3,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 4
                  },
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 2
                  },
                  {
                      "x": 3,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 11,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 5,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 5
                  },
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 4
                  },
                  {
                      "x": 1,
                      "y": 3
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 3,
                  "y": 4
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 4,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 3
                  },
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 5
                  },
                  {
                      "x": 6,
                      "y": 7
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 3,
                  "y": 2
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 5
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  },
                  {
                      "x": 6,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 12,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 3,
                  "y": 4
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 5
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 0
                  },
                  {
                      "x": 5,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 2,
                      "y": 1
                  },
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 3,
                  "y": 2
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 0
                  },
                  {
                      "x": 2,
                      "y": 1
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 4
                  },
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 13,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 5,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 6
                  },
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 4
                  },
                  {
                      "x": 1,
                      "y": 3
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 3,
                  "y": 4
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 4,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 3
                  },
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 5
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 7
                  },
                  {
                      "x": 6,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 4,
                      "y": 5
                  },
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 3,
                  "y": 2
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 5
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  },
                  {
                      "x": 6,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 14,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 3,
                  "y": 4
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 5
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 0
                  },
                  {
                      "x": 5,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 1
                  },
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 3,
                  "y": 2
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 0
                  },
                  {
                      "x": 2,
                      "y": 1
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 6,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 2
                  },
                  {
                      "x": 4,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 1
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": true
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 4
                  },
                  {
                      "x": 4,
                      "y": 4
                  },
                  {
                      "x": 6,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 15,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 3,
                  "y": 7
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 6
                  },
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 4
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 6
                  },
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 3,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 3,
                  "y": 4
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 4,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 6
                  },
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 3
                  },
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 5
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 7
                  },
                  {
                      "x": 6,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 4,
                      "y": 5
                  },
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 3,
                  "y": 2
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 5,
                  "y": 2
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 5
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  },
                  {
                      "x": 6,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 16,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 0,
                  "y": 4
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 3,
                  "y": 4
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 5
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 1,
                  "y": 0
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 2
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 0
                  },
                  {
                      "x": 5,
                      "y": 1
                  },
                  {
                      "x": 7,
                      "y": 0
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 2,
                      "y": 1
                  },
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 3,
                  "y": 2
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 0
                  },
                  {
                      "x": 2,
                      "y": 1
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 5,
                  "y": 2
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 4
                  },
                  {
                      "x": 6,
                      "y": 0
                  },
                  {
                      "x": 4,
                      "y": 4
                  },
                  {
                      "x": 7,
                      "y": 3
                  },
                  {
                      "x": 7,
                      "y": 1
                  },
                  {
                      "x": 3,
                      "y": 3
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 1
                  },
                  {
                      "x": 6,
                      "y": 0
                  },
                  {
                      "x": 5,
                      "y": 0
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 4
                  },
                  {
                      "x": 4,
                      "y": 4
                  },
                  {
                      "x": 6,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 17,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 0,
                  "y": 4
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 3
                  },
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 1
                  },
                  {
                      "x": 1,
                      "y": 4
                  },
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 6
                  },
                  {
                      "x": 3,
                      "y": 7
                  },
                  {
                      "x": 1,
                      "y": 3
                  },
                  {
                      "x": 2,
                      "y": 2
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 3,
                      "y": 7
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 6
                  },
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 3,
                      "y": 5
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 3,
                  "y": 4
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 6
                  },
                  {
                      "x": 4,
                      "y": 2
                  },
                  {
                      "x": 2,
                      "y": 6
                  },
                  {
                      "x": 2,
                      "y": 2
                  },
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 3
                  },
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 5
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 6
                  },
                  {
                      "x": 7,
                      "y": 7
                  },
                  {
                      "x": 6,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 4,
                      "y": 5
                  },
                  {
                      "x": 3,
                      "y": 5
                  },
                  {
                      "x": 2,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 2,
                  "y": 2
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 3,
                  "y": 2
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 5,
                  "y": 2
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 5
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 5
                  },
                  {
                      "x": 1,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 5
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 5
                  },
                  {
                      "x": 5,
                      "y": 4
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  },
                  {
                      "x": 6,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 18,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  },
  {
      "pieces": [
          {
              "image": "/bR.png",
              "position": {
                  "x": 0,
                  "y": 7
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 1,
                  "y": 7
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 2,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bQ.png",
              "position": {
                  "x": 0,
                  "y": 4
              },
              "type": "Q",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/bK.png",
              "position": {
                  "x": 4,
                  "y": 7
              },
              "type": "K",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bB.png",
              "position": {
                  "x": 5,
                  "y": 7
              },
              "type": "B",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/bN.png",
              "position": {
                  "x": 3,
                  "y": 4
              },
              "type": "N",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/bR.png",
              "position": {
                  "x": 7,
                  "y": 5
              },
              "type": "R",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 0,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 0
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 2,
                  "y": 2
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 4
                  },
                  {
                      "x": 1,
                      "y": 4
                  },
                  {
                      "x": 1,
                      "y": 0
                  },
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 2,
                  "y": 0
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false
          },
          {
              "image": "/wK.png",
              "position": {
                  "x": 4,
                  "y": 0
              },
              "type": "K",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 0
                  },
                  {
                      "x": 5,
                      "y": 1
                  },
                  {
                      "x": 7,
                      "y": 0
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wQ.png",
              "position": {
                  "x": 3,
                  "y": 0
              },
              "type": "Q",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 2,
                      "y": 1
                  },
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/wB.png",
              "position": {
                  "x": 3,
                  "y": 2
              },
              "type": "B",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 4,
                      "y": 1
                  },
                  {
                      "x": 5,
                      "y": 0
                  },
                  {
                      "x": 2,
                      "y": 1
                  },
                  {
                      "x": 1,
                      "y": 0
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/wN.png",
              "position": {
                  "x": 5,
                  "y": 2
              },
              "type": "N",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 6,
                      "y": 4
                  },
                  {
                      "x": 6,
                      "y": 0
                  },
                  {
                      "x": 4,
                      "y": 4
                  },
                  {
                      "x": 7,
                      "y": 3
                  },
                  {
                      "x": 7,
                      "y": 1
                  },
                  {
                      "x": 3,
                      "y": 3
                  }
              ],
              "hasMoved": true
          },
          {
              "image": "/wR.png",
              "position": {
                  "x": 7,
                  "y": 0
              },
              "type": "R",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 1
                  },
                  {
                      "x": 6,
                      "y": 0
                  },
                  {
                      "x": 5,
                      "y": 0
                  }
              ],
              "hasMoved": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 0,
                  "y": 5
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 1,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 2,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 3,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 4,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 5,
                  "y": 6
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 6,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/bP.png",
              "position": {
                  "x": 7,
                  "y": 4
              },
              "type": "P",
              "color": "b",
              "possibleMoves": [],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 0,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 0,
                      "y": 2
                  },
                  {
                      "x": 0,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 1,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 1,
                      "y": 2
                  },
                  {
                      "x": 1,
                      "y": 3
                  }
              ],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 2,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 3,
                  "y": 1
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [],
              "hasMoved": false,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 4,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 3,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 5,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 5,
                      "y": 4
                  },
                  {
                      "x": 4,
                      "y": 4
                  },
                  {
                      "x": 6,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 6,
                  "y": 3
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 4
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          },
          {
              "image": "/wP.png",
              "position": {
                  "x": 7,
                  "y": 2
              },
              "type": "P",
              "color": "w",
              "possibleMoves": [
                  {
                      "x": 7,
                      "y": 3
                  }
              ],
              "hasMoved": true,
              "enPassant": false
          }
      ],
      "totalTurns": 19,
      "kingCheck": false,
      "checkmate": false,
      "stalemate": false
  }
]

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
