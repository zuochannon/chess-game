import { ColorTeam } from "../enums/ChessEnums";
import { ChessPiece } from "./ChessPiece";

// Handles chessboard moves, such as possible moves that each piece can do
export class Chessboard {
    pieces: ChessPiece[];
    totalTurns: number;
    winningTeam ?: ColorTeam;

    constructor(pieces: ChessPiece[], totalTurns: number) {
        this.pieces = pieces;
        this.totalTurns = totalTurns;
    }

    // Check whose turn it is
    get currentTeam(): ColorTeam {
        return (this.totalTurns % 2 === 0) ? ColorTeam.BLACK : ColorTeam.WHITE;
    }

    

}