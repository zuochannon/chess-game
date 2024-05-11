import { ColorTeam } from "../../data/enums/ChessEnums";
import { ChessPiece } from "../../data/models/ChessPiece";
import { Position } from "../../data/models/Position";


// Checks if square is occupied by any pieces
export const isSquareOccupied = (position: Position, boardState: ChessPiece[]): boolean => {
    const piece = boardState.find(p => p.hasSamePositionAs(position));

    // Returns if piece is there
    return piece != null;
}

// Checks if square is occupied by opponent
export const isSquareOccupiedByOppositeColor = (position: Position, boardState: ChessPiece[], color: ColorTeam): boolean => {

    const piece = boardState.find((p) => p.hasSamePositionAs(position) && p.color !== color);

    // Returns if piece is there
    return piece != null;
}