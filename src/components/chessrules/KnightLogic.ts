import { ColorTeam } from "../../data/enums/ChessEnums";
import { Position } from "../../data/models/Position";
import { isSquareOccupied, isSquareOccupiedByOppositeColor } from "./GeneralLogic";

// Moves the knight piece
export const knightMove = (initialPosition: Position, newPosition: Position, color: ColorTeam, boardState: ChessPiece[]) : boolean => {

    // Handles Movement of Knight Piece (performs L shape movement)
    for (let i = -1; i < 2; i+=2) { /* i handles the stem of the L (the long part which is 2 squares long) */
        for (let j = -1; j < 2; j += 2) {   /* j handles the arm of the L (the short part which is 1 square long) */
            
            // Handles movement where it goes 2 squares up/down and 1 square left/right
            if (newPosition.y - initialPosition.y === 2 * i) {
                if (newPosition.x - initialPosition.x === 1 * j) {
                    if (!isSquareOccupied(newPosition, boardState) || isSquareOccupiedByOppositeColor(newPosition, boardState, color)) {
                        return true;
                    }
                } 
            }

            // Handles movement where it goes 1 squares up/down and 2 square left/right
            if (newPosition.x - initialPosition.x === 2 * i) {
                if (newPosition.y - initialPosition.y === 1 * j) {
                    if (!isSquareOccupied(newPosition, boardState) || isSquareOccupiedByOppositeColor(newPosition, boardState, color)) {
                        return true;
                    }
                } 
            }
        }
    }

    return false;
}