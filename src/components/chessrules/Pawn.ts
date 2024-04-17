import { ColorTeam } from "../../data/enums/ChessEnums";
import { Position } from "../../data/models/Position";
import { Piece } from "../chessboard/ChessBoard";
import { isSquareOccupied, isSquareOccupiedByOppositeColor } from "./General";


export const pawnMove = (initialPosition: Position, newPosition: Position, color: ColorTeam, boardState: Piece[]) : boolean => {

    const pawnRow = (color === ColorTeam.WHITE) ? 1 : 6;    // if white, handle white pawns; if black, handle black pawns
    const pawnDir = (color === ColorTeam.WHITE) ? 1 : -1;   // if White, go positive; if black, go negative direction

    // Handles Pawn Movement
    // First:  Handles Pawn's first move case where it can move 2 squares forward 
    // Second: Handles Pawn's moves where it can only move 1 space forward
    if (initialPosition.x === newPosition.x && initialPosition.y === pawnRow && newPosition.y - initialPosition.y === 2 * pawnDir) { 
        if (!isSquareOccupied(newPosition, boardState) && !isSquareOccupied(new Position (newPosition.x, newPosition.y - pawnDir), boardState)) {
            return true;
        }
    } else if (initialPosition.x === newPosition.x && newPosition.y - initialPosition.y === 1 * pawnDir) {
        if (!isSquareOccupied(newPosition, boardState)) {
            return true;
        }
    }

    // Handles Pawn Attack Logic
    // Pawn can capture piece if piece is in upper corners relative to pawn piece
    else if (newPosition.x - initialPosition.x === -1 && newPosition.y - initialPosition.y === pawnDir) {
        if (isSquareOccupiedByOppositeColor(newPosition, boardState, color)) {
            return true;
        }
    } else if (newPosition.x - initialPosition.x === 1 && newPosition.y - initialPosition.y === pawnDir) {
        if (isSquareOccupiedByOppositeColor(newPosition, boardState, color)) {
            return true;
        }
    }


    // Return false for invalid pawn move
    return false;
}