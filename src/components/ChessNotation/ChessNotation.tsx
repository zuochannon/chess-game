import { Position } from "../../data/models/Position";
import { PieceType } from "../../data/enums/ChessEnums";
import { ChessPiece } from "../../data/models/ChessPiece";
import { COLUMNS, ROWS } from "../../data/constants/ChessConstants";
import { Board } from "@/data/models/Board";

// Function to generate algebraic notation for a position (e.g., [0, 0] -> "a1")
export function getPositionAlgebraicNotation(position: Position): string {
    const column = COLUMNS[position.x];
    const row = ROWS[position.y];
    return `${column}${row}`;
}

// Updated to include startPosition and isCapture
export function generateMoveNotation(piece: ChessPiece, board: Board, startPosition: Position, dest: Position, isCapture: boolean, check: boolean, checkmate: boolean): string {
    const pieceType = piece.type;
    const startPositionNotation = getPositionAlgebraicNotation(startPosition);
    const endPosition = getPositionAlgebraicNotation(dest);
    let notation = "";

    // Get other rook and knight
    // SPECIAL CASE: two pieces of the same type can move into common destination. PGN must differentiate the two
    const otherKnight = board.pieces.find(p => p.isKnight && p.color === piece.color && !p.hasSamePiecePositionAs(piece))?.clone();
    if (otherKnight)
        otherKnight.possibleMoves = board.getMoves(otherKnight, board.pieces, false);
    const otherRook = board.pieces.find(p => p.isRook && p.color === piece.color && !p.hasSamePiecePositionAs(piece))?.clone();
    if (otherRook)
        otherRook.possibleMoves = board.getMoves(otherRook, board.pieces, false);

    let common = false;
    let sameX = false;

    switch (pieceType) {
        case PieceType.PAWN:
            notation = isCapture ? `${startPositionNotation[0]}x${endPosition}` : endPosition;
            break;
        case PieceType.KNIGHT:
            if (otherKnight && otherKnight.possibleMoves)
                common = otherKnight.possibleMoves.some(move => piece.possibleMoves?.some(m => m.equalsTo(dest) && m.equalsTo(move)));
            sameX = otherKnight?.position.x === piece.position.x;
            notation = `${pieceType[0]}${common ? sameX ? startPositionNotation[1] : startPositionNotation[0] : ""}${isCapture ? 'x' : ''}${endPosition}`;
            break;
        case PieceType.ROOK:
            if (otherRook && otherRook.possibleMoves)
                common = otherRook.possibleMoves.some(move => piece.possibleMoves?.some(m => m.equalsTo(dest) && m.equalsTo(move)));
            sameX = otherRook?.position.x === piece.position.x;
            notation = `${pieceType[0]}${common ? sameX ? startPositionNotation[1] : startPositionNotation[0] : ""}${isCapture ? 'x' : ''}${endPosition}`;
            break;
        case PieceType.BISHOP:
        case PieceType.QUEEN:
            notation = `${pieceType[0]}${isCapture ? 'x' : ''}${endPosition}`;
            break;
        case PieceType.KING:
            // Check if the king moved two squares to the right or left
            if (Math.abs(dest.x - startPosition.x) > 1) {
                notation = dest.x > startPosition.x ? "O-O" : "O-O-O";
            } else {
                notation = `K${isCapture ? 'x' : ''}${endPosition}`;
            }
            break;
        default:
            notation = ""; // Shouldn't happen
    }

    if (checkmate) {
        notation += "#";
    } else if (check) {
        notation += "+";
    }

    return notation;
} 