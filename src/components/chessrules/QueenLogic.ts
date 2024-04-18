import { Piece } from "../../data/constants/ChessConstants";
import { ColorTeam } from "../../data/enums/ChessEnums";
import { Position } from "../../data/models/Position";
import { isSquareOccupied, isSquareOccupiedByOppositeColor } from "./GeneralLogic";

// Moves the Queen piece
export const queenMove = (initialPosition: Position, newPosition: Position, color: ColorTeam, boardState: Piece[]) : boolean => {
    
    // Handles Movement where the piece can move diagonally
    for (let i = 1; i < 8; i++) { /* Individually checks all passed squares if a piece occupies a square in its path */

        let multiplierX = (newPosition.x < initialPosition.x) ? -1 : (newPosition.x > initialPosition.x) ? 1 : 0;
        let multiplierY = (newPosition.y < initialPosition.y) ? -1 : (newPosition.y > initialPosition.y) ? 1 : 0;

        let passedPosition = new Position(initialPosition.x + (i * multiplierX), initialPosition.y + (i * multiplierY));

        // Checks if a piece is in its path
        // First Case: If new position is empty or occupied by enemy, take it
        // Second Case: Any pieces blocking piece's desired position on board
        if (passedPosition.equalsTo(newPosition)) {
            if (!isSquareOccupied(passedPosition, boardState) || isSquareOccupiedByOppositeColor(passedPosition, boardState, color)) {
                return true;
            }
        } else {
            if (isSquareOccupied(passedPosition, boardState)) {
                break;
            }
        }  
    }

    return false;
}
