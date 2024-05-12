import { ColorTeam } from "../../data/enums/ChessEnums";
import { ChessPiece, Pawn } from "../../data/models/ChessPiece";
import { Position } from "../../data/models/Position";
import { isSquareOccupied, isSquareOccupiedByOppositeColor } from "./GeneralLogic";


export const pawnMove = (initialPosition: Position, newPosition: Position, color: ColorTeam, boardState: ChessPiece[]): boolean => {

    const pawnRow = (color === ColorTeam.WHITE) ? 1 : 6;    // if white, handle white pawns; if black, handle black pawns
    const pawnDir = (color === ColorTeam.WHITE) ? 1 : -1;   // if white, go positive; if black, go negative direction

    // Handles Pawn Movement
    // First:  Handles Pawn's first move case where it can move 2 squares forward 
    // Second: Handles Pawn's moves where it can only move 1 space forward
    if (initialPosition.x === newPosition.x && initialPosition.y === pawnRow && newPosition.y - initialPosition.y === 2 * pawnDir) {
        if (!isSquareOccupied(newPosition, boardState) && !isSquareOccupied(new Position(newPosition.x, newPosition.y - pawnDir), boardState)) {
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

// Exports all possible pawn moves of that pawn piece
export const getPossiblePawnMoves = (pawn: ChessPiece, board: ChessPiece[]): Position[] => {
    // Stores all possible pawn moves
    const possibleMoves: Position[] = [];

    const pawnRow = (pawn.color === ColorTeam.WHITE) ? 1 : 6;    // if white, handle white pawns; if black, handle black pawns
    const pawnDir = (pawn.color === ColorTeam.WHITE) ? 1 : -1;   // if white, go positive; if black, go negative direction

    // Get all moves of pawn piece
    const normalMove = new Position(pawn.position.x, pawn.position.y + pawnDir);
    const specialMove = new Position(normalMove.x, normalMove.y + pawnDir);
    const upperLeftAttack = new Position(pawn.position.x - 1, pawn.position.y + pawnDir);
    const upperRightAttack = new Position(pawn.position.x + 1, pawn.position.y + pawnDir);
    const leftPos = new Position(pawn.position.x - 1, pawn.position.y);
    const rightPos = new Position(pawn.position.x + 1, pawn.position.y);

    // Check if square is occupied. Otherwise, push the move into possible moves
    if (!isSquareOccupied(normalMove, board)) {
        possibleMoves.push(normalMove);

        // If it is pawn's first move, include the extra space in possibleMoves
        if (pawn.position.y === pawnRow && !isSquareOccupied(specialMove, board)) {
            possibleMoves.push(specialMove);
        }
    }

    // Check if it can capture an oppposing piece to its upper left 
    // position and add it if it is possible
    if (isSquareOccupiedByOppositeColor(upperLeftAttack, board, pawn.color)) {
        possibleMoves.push(upperLeftAttack);
    }
    // Check for en passant condition
    else if (!isSquareOccupied(upperLeftAttack, board)) {
        const leftPiece = board.find(p => p.hasSamePositionAs(leftPos));
        if (leftPiece != null && (leftPiece as Pawn).enPassant) {
            possibleMoves.push(upperLeftAttack);
        }
    }

    // Check if it can capture an oppposing piece to its upper right 
    // position and add it if it is possible
    if (isSquareOccupiedByOppositeColor(upperRightAttack, board, pawn.color)) {
        possibleMoves.push(upperRightAttack);
    }
    // Check for en passant condition
    else if (!isSquareOccupied(upperRightAttack, board)) {
        const rightPiece = board.find(p => p.hasSamePositionAs(rightPos));
        if (rightPiece != null && (rightPiece as Pawn).enPassant) {
            possibleMoves.push(upperRightAttack);
        }
    }

    return possibleMoves;
}