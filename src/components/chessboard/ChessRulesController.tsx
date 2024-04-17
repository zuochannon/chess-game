import { ColorTeam, PieceType } from "../../data/enums/ChessEnums";
import { Position } from "../../data/models/Position";
import { pawnMove } from "../chessrules/Pawn";
import { Piece } from "./ChessBoard";

// Responsible for handling valid chess moves
export default class ChessRulesController {

    // Checks if it is a valid move by that particular piece
    isValidMove(initialPosition: Position, newPosition: Position, type: PieceType, color: ColorTeam, boardState: Piece[]) {
        let valid = false;

        // Check by piece type
        switch(type) {
            case PieceType.PAWN:
                valid = pawnMove(initialPosition, newPosition, color, boardState);
                break;
            case PieceType.KNIGHT:
                valid;
                break;
            case PieceType.BISHOP:
                valid;
                break;
            case PieceType.ROOK:
                valid;
                break;
            case PieceType.QUEEN:
                valid;
                break;
            case PieceType.KING:
                valid;
                break;
        }

        return valid;
    }

    isEnPassantMove(initialPosition: Position, newPosition: Position, type: PieceType, color: ColorTeam, boardState: Piece[]) {
        const pawnDirection = (color === ColorTeam.WHITE) ? 1 : -1;

        if (type === PieceType.PAWN) {
            if ((newPosition.x - initialPosition.x === -1 || newPosition.x - initialPosition.x === 1) &&
                newPosition.y - initialPosition.y === pawnDirection) {
                const piece = boardState.find(
                    (p) => p.position.x === newPosition.x && p.position.y === newPosition.y - pawnDirection && p.enPassant
                );

                if (piece) {
                    return true;
                }
            }
        }

        return false;
    }
}