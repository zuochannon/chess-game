import { useState, useRef } from "react";
import { ColorTeam, PieceType } from "../../data/enums/ChessEnums";
import { ChessPiece } from "../../data/models/ChessPiece";
import { Position } from "../../data/models/Position";
import { pawnMove, knightMove, bishopMove, rookMove, queenMove, kingMove } from "../chessrules";
import Chessboard from "./ChessBoard";
import { initialBoard } from "../../data/constants/ChessConstants";

// Responsible for handling valid chess moves
export default function ChessRulesController {

    const [board, setBoard] = useState<Chessboard>(initialBoard.clone());
    const [promotionPawn, setPromotionPawn] = useState<ChessPiece>();
    const modalRef = useRef<HTMLDivElement>(null);
    const checkmateModalRef = useRef<HTMLDivElement>(null);

    // Checks if it is a valid move by that particular piece
    function isValidMove(initialPosition: Position, newPosition: Position, type: PieceType, color: ColorTeam) {
        let valid = false;

        // Check by piece type
        switch(type) {
            case PieceType.PAWN:
                valid = pawnMove(initialPosition, newPosition, color, board.pieces);
                break;
            case PieceType.KNIGHT:
                valid = knightMove(initialPosition, newPosition, color, board.pieces);
                break;
            case PieceType.BISHOP:
                valid = bishopMove(initialPosition, newPosition, color, board.pieces);
                break;
            case PieceType.ROOK:
                valid = rookMove(initialPosition, newPosition, color, board.pieces);
                break;
            case PieceType.QUEEN:
                valid = queenMove(initialPosition, newPosition, color, board.pieces);
                break;
            case PieceType.KING:
                valid = kingMove(initialPosition, newPosition, color, board.pieces);
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

    function promotionTeamType() {
        return (promotionPawn?.color === ColorTeam.WHITE) ? "w" : "b";
    }
    
    function restartGame() {
        checkmateModalRef.current?.classList.add("hidden");
        setBoard(initialBoard.clone());
    }

    // Return Promotion Prompt
    return (
        <>
            <div className="modal hidden" ref={modalRef}>
                <div className="modal-body">
                    <img onClick={() => promotePawn(PieceType.ROOK)} src={`/assets/chess/${promotionTeamType()}R.png`} />
                    <img onClick={() => promotePawn(PieceType.BISHOP)} src={`/assets/chess/${promotionTeamType()}B.png`} />
                    <img onClick={() => promotePawn(PieceType.KNIGHT)} src={`/assets/chess/${promotionTeamType()}N.png`} />
                    <img onClick={() => promotePawn(PieceType.QUEEN)} src={`/assets/chess/${promotionTeamType()}Q.png`} />
                </div>
            </div>
            <Chessboard playMove={playMove} pieces={board.pieces} />
        </>
    );
}