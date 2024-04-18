import { Piece } from "../../data/constants/ChessConstants";
import { ColorTeam } from "../../data/enums/ChessEnums";
import { Position } from "../../data/models/Position";


// Checks if square is occupied by any pieces
export const isSquareOccupied = (position: Position, boardState: Piece[]): boolean => {
    const piece = boardState.find(p => p.chessPiece.position.equalsTo(position));

    // Returns if piece is there
    return piece != null;
}

// Checks if square is occupied by opponent
export const isSquareOccupiedByOppositeColor = (position: Position, boardState: Piece[], color: ColorTeam): boolean => {
    
    const piece = boardState.find((p) => p.chessPiece.position.equalsTo(position) && p.chessPiece.color !== color);

    // Returns if piece is there
    return piece != null;
}