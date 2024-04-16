import { Position } from "../../data/models/Position";
import { Piece } from "../chessboard/ChessBoard";

// Checks if square is occupied
export const isSquareOccupied = (position: Position, boardState: Piece[]): boolean => {
    const piece = boardState.find(p => p.position.x === position.x && p.position.y === position.y);

    return piece != null;
}