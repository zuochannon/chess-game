import { useState, useRef } from "react";
import { ColorTeam, PieceType } from "../../data/enums/ChessEnums";
import { ChessPiece } from "../../data/models/ChessPiece";
import { Position } from "../../data/models/Position";
import { pawnMove, knightMove, bishopMove, rookMove, queenMove, kingMove } from "../chessrules";

// Responsible for handling valid chess moves
export default class ChessRulesController {

    const [board, setBoard] = useState<Chessboard>(initialBoard.clone());
    const [promotionPawn, setPromotionPawn] = useState<ChessPiece>();
    const modalRef = useRef<HTMLDivElement>(null);
    const checkmateModalRef = useRef<HTMLDivElement>(null);

    // Checks if it is a valid move by that particular piece
    isValidMove(initialPosition: Position, newPosition: Position, type: PieceType, color: ColorTeam) {
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

    // Handles pawn promotion
    function promotePawn(pieceType: PieceType) {
        // Check if pawn promotion is possible
        if (promotionPawn === undefined) {
            return;
        }

        setBoard((prevBoard) => {
            const clonedChessboard = board.clone();
            clonedChessboard.pieces = clonedChessboard.pieces.reduce((results, piece) => {
                if (piece.)
            }, [] as ChessPiece[])
        });
    }
}