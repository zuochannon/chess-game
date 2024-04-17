import { ColorTeam } from "../../data/enums/ChessEnums";
import { Position } from "../../data/models/Position";
import { Piece } from "../chessboard/ChessBoard";

// Checks if square is occupied by any pieces
export const isSquareOccupied = (position: Position, boardState: Piece[]): boolean => {
    const piece = boardState.find(p => p.position.x === position.x && p.position.y === position.y);

    // Returns if piece is there
    return piece != null;
}

// Checks if square is occupied by opponent
export const isSquareOccupiedByOppositeColor = (position: Position, boardState: Piece[], color: ColorTeam): boolean => {
    
    const piece = boardState.find(p => p.position.x === position.x && p.position.y === position.y && p.color !== color);

    // Returns if piece is there
    return piece != null;
}