import { ColorTeam } from "../../data/enums/ChessEnums";
import { ChessPiece } from "../../data/models/ChessPiece";
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

// Export all possible knight moves from the selected knight piece
export const getPossibleKnightMoves = (knight: ChessPiece, board: ChessPiece[]): Position[] => {
    // Stores all possible knight moves by piece
    const possibleMoves: Position[] = [];

    // Checks for all possible knight moves
    for (let i = -1; i < 2; i+=2) { /* i handles the stem of the L (the long part which is 2 squares long) */
        for (let j = -1; j < 2; j += 2) {   /* j handles the arm of the L (the short part which is 1 square long) */
        
            const verticalMove = new Position(knight.position.x + j, knight.position.y + i * 2);
            const horizontalMove = new Position(knight.position.x + i * 2, knight.position.y + j);
  
            // Check if square is not occupied or occupied by enemy in vertical direction
            if(!isSquareOccupied(verticalMove, board) || isSquareOccupiedByOppositeColor(verticalMove, board, knight.color)) {
                possibleMoves.push(verticalMove);
            }
  
            // Check if square is not occupied or occupied by enemy in horizontal direction
            if(!isSquareOccupied(horizontalMove, board) || isSquareOccupiedByOppositeColor(horizontalMove, board, knight.color))  {
                possibleMoves.push(horizontalMove);
            }
        }           
    
    }
    return possibleMoves;
}