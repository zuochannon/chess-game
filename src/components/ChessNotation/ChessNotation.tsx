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

// Function to generate notation for a move
export function generateMoveNotation(piece: ChessPiece, dest: Position, check: boolean, checkmate: boolean, stalemate: boolean): string {
    const pieceType = piece.type;
    const endPosition = getPositionAlgebraicNotation(dest);

    let notation = "";

    switch (pieceType) {
        case PieceType.PAWN:
            notation = endPosition;
            break;
        case PieceType.KNIGHT:
            notation = `N${endPosition}`;
            break;
        case PieceType.BISHOP:
            notation = `B${endPosition}`;
            break;
        case PieceType.ROOK:
            notation = `R${endPosition}`;
            break;
        case PieceType.QUEEN:
            notation = `Q${endPosition}`;
            break;
        case PieceType.KING:
            notation = `K${endPosition}`;
            break;
        default:
            notation = ""; // Default case, shouldn't happen
    }

    // Append additional information
    if (checkmate) {
        notation += "#"; // Checkmate symbol
    } else if (check) {
        console.log("check: " + check);
        notation += "+"; // Check symbol
    }

    return notation;
}
