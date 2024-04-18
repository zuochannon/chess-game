import { Piece } from "../../data/constants/ChessConstants";
import { ColorTeam } from "../../data/enums/ChessEnums";
import { Position } from "../../data/models/Position";
import { isSquareOccupied, isSquareOccupiedByOppositeColor } from "./GeneralLogic";

// Moves the King piece
export const kingMove = (initialPosition: Position, newPosition: Position, color: ColorTeam, boardState: Piece[]) : boolean => {
    
    // Enables King to move diagonally, vertically, and horizontally
    let multiplierX = (newPosition.x < initialPosition.x) ? -1 : (newPosition.x > initialPosition.x) ? 1 : 0;
    let multiplierY = (newPosition.y < initialPosition.y) ? -1 : (newPosition.y > initialPosition.y) ? 1 : 0;

    let possiblePosition = new Position(initialPosition.x + (1 * multiplierX), initialPosition.y + (1 * multiplierY));

    // Checks if a piece is in its path
    // First Case: If new position is empty or occupied by enemy, take it
    // Second Case: Any pieces blocking piece's desired position on board
    if (possiblePosition.equalsTo(newPosition)) {
        if (!isSquareOccupied(possiblePosition, boardState) || isSquareOccupiedByOppositeColor(possiblePosition, boardState, color)) {
            return true;
        }
    } 

    return false;
}
