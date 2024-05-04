import { ColorTeam, PieceType } from "../enums/ChessEnums";
import { ChessPiece } from "./ChessPiece";
import { Position } from "./Position";

// Export Pawn Class extension that handles en passant
export class Pawn extends ChessPiece {
    enPassant?: boolean;

    constructor(position: Position, color: ColorTeam, hasMoved: boolean, enPassant?: boolean, possibleMoves: Position[] = []) {
        super(position, PieceType.PAWN, color, hasMoved, possibleMoves);
        this.enPassant = enPassant;
    }

    clone(): Pawn {
        return new Pawn(this.position.clone(), this.color, this.hasMoved, this.enPassant, this.possibleMoves?.map(m => m.clone()))
    }
}