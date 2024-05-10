// src/components/ChessNotation/ChessNotation.tsx

import { Position } from "../../data/models/Position";
import { PieceType } from "../../data/enums/ChessEnums";
import { ChessPiece } from "../../data/models/ChessPiece";
import { COLUMNS, ROWS } from "../../data/constants/ChessConstants";

// Function to generate algebraic notation for a position (e.g., [0, 0] -> "a1")
export function getPositionAlgebraicNotation(position: Position): string {
    const column = COLUMNS[position.x];
    const row = ROWS[position.y];
    return `${column}${row}`;
}

// Updated to include startPosition and isCapture
export function generateMoveNotation(piece: ChessPiece, startPosition: Position, dest: Position, isCapture: boolean, check: boolean, checkmate: boolean): string {
    const pieceType = piece.type;
    const startPositionNotation = getPositionAlgebraicNotation(startPosition);
    const endPosition = getPositionAlgebraicNotation(dest);
    let notation = "";

    if (pieceType === PieceType.KING) {
        // Check if the king moved two squares to the right or left
        if (Math.abs(dest.x - startPosition.x) > 1) {
            notation = dest.x > startPosition.x ? "O-O" : "O-O-O";
        } else {
            notation = `K${endPosition}`;
        }
    }
        
    else {
        switch (pieceType) {
            case PieceType.PAWN:
                notation = isCapture ? `${startPositionNotation[0]}x${endPosition}` : endPosition;
                break;
            case PieceType.KNIGHT:
            case PieceType.BISHOP:
            case PieceType.ROOK:
            case PieceType.QUEEN:
                notation = `${pieceType[0]}${isCapture ? 'x' : ''}${endPosition}`;
                break;
            case PieceType.KING:
                notation = `K${endPosition}`;
                break;
            default:
                notation = ""; // Shouldn't happen
        }
    }

    if (checkmate) {
        notation += "#";
    } else if (check) {
        notation += "+";
    }

    return notation;
}
