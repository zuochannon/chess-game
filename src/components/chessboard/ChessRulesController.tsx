import { Piece } from "../../data/constants/ChessConstants";
import { ColorTeam, PieceType } from "../../data/enums/ChessEnums";
import { Position } from "../../data/models/Position";
import { bishopMove } from "../chessrules/BishopLogic";
import { kingMove } from "../chessrules/KingLogic";
import { knightMove } from "../chessrules/KnightLogic";
import { pawnMove } from "../chessrules/PawnLogic";
import { queenMove } from "../chessrules/QueenLogic";
import { rookMove } from "../chessrules/RookLogic";

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
                valid = knightMove(initialPosition, newPosition, color, boardState);
                break;
            case PieceType.BISHOP:
                valid = bishopMove(initialPosition, newPosition, color, boardState);
                break;
            case PieceType.ROOK:
                valid = rookMove(initialPosition, newPosition, color, boardState);
                break;
            case PieceType.QUEEN:
                valid = queenMove(initialPosition, newPosition, color, boardState);
                break;
            case PieceType.KING:
                valid = kingMove(initialPosition, newPosition, color, boardState);
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
                    (p) => p.chessPiece.position.x === newPosition.x && p.chessPiece.position.y === newPosition.y - pawnDirection && p.enPassant
                );

                if (piece) {
                    return true;
                }
            }
        }

        return false;
    }
}