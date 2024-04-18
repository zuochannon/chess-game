import { Piece } from "../../data/constants/ChessConstants";
import { ColorTeam } from "../../data/enums/ChessEnums";
import { Position } from "../../data/models/Position";
import { isSquareOccupied, isSquareOccupiedByOppositeColor } from "./GeneralLogic";

// Moves the rook piece
export const rookMove = (initialPosition: Position, newPosition: Position, color: ColorTeam, boardState: Piece[]) : boolean => {
    
    // Case: Moves along a column (top and bottom)
    if (newPosition.y === initialPosition.y) {
        for (let i = 1; i < 8; i++) {
            const direction = (newPosition.x > initialPosition.x) ? 1 : -1; 
            let passedPosition = new Position(initialPosition.x + (i * direction), initialPosition.y);

            // Checks if a piece is in its path
            // Case 1: Checks if destination is empty or occupied by opponent
            // Case 2: Checks if a piece is blocking its path
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
    }

    // Case: Moves along a row (left and right)
    if (newPosition.x === initialPosition.x) {
        for (let i = 1; i < 8; i++) {
            const direction = (newPosition.y > initialPosition.y) ? 1 : -1; 
            let passedPosition = new Position(initialPosition.x, initialPosition.y + (i * direction));

            // Checks if a piece is in its path
            // Case 1: Checks if destination is empty or occupied by opponent
            // Case 2: Checks if a piece is blocking its path
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
    }

    return false;
}
