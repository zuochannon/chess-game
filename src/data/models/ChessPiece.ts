import { COLUMNS, ROWS } from "../constants/ChessConstants";
import { PieceType, ColorTeam } from "../enums/ChessEnums";
import { Position } from "./Position";

export class ChessPiece {
    image: string;
    position: Position;
    type: PieceType
    color: ColorTeam;
    possibleMoves?: Position[];
    hasMoved: boolean;

    constructor(position: Position, type: PieceType, color: ColorTeam, hasMoved: boolean, possibleMoves: Position[] = []) {
        this.image = `src/assets/chess/${color}${type}.png`;
        this.position = position;
        this.type = type;
        this.color = color;
        this.possibleMoves = possibleMoves;
        this.hasMoved = hasMoved;
    }

    // Check if type is pawn
    get isPawn() : boolean {
        return this.type === PieceType.PAWN;
    }

    // Checks if type is rook
    get isRook() : boolean {
        return this.type === PieceType.ROOK;
    }

    // Checks if type is knight
    get isKnight() : boolean {
        return this.type === PieceType.KNIGHT;
    }

    // Checks if type is bishop
    get isBishop() : boolean {
        return this.type === PieceType.BISHOP;
    }

    // Checks if type is king
    get isKing() : boolean {
        return this.type === PieceType.KING;
    }

    // Checks if type is queen
    get isQueen() : boolean {
        return this.type === PieceType.QUEEN;
    }

    hasSamePiecePositionAs(otherPiece: ChessPiece) : boolean {
        return this.position.equalsTo(otherPiece.position);
    }

    hasSamePositionAs(otherPosition: Position) : boolean {
        return this.position.equalsTo(otherPosition);
    }

    // Get board position of chess piece
    get boardPosition(): string {
        const letter = COLUMNS[this.position.x];
        const number = ROWS[this.position.y];

        return `${letter}${number}`;
    }

    clone(): ChessPiece {
        return new ChessPiece(this.position.clone(),
             this.type, this.color, this.hasMoved,
             this.possibleMoves?.map(m => m.clone()));
    }
}

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