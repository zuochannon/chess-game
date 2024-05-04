import { ColorTeam } from "../../data/enums/ChessEnums";
import { ChessPiece } from "../../data/models/ChessPiece";
import { Position } from "../../data/models/Position";
import { isSquareOccupied, isSquareOccupiedByOppositeColor } from "./GeneralLogic";

// Moves the bishop piece
export const bishopMove = (initialPosition: Position, newPosition: Position, color: ColorTeam, boardState: ChessPiece[]) : boolean => {

    // Handles Movement where the piece can move diagonally
    for (let i = 1; i < 8; i++) { /* Individually checks all passed squares if a piece occupies a square in its path */

        // Case: Moves diagonally to upper right
        if (newPosition.x > initialPosition.x && newPosition.y > initialPosition.y) {
            let passedPosition = new Position(initialPosition.x + i, initialPosition.y + i);

            // Checks if a piece is in its path
            // First Case: If new position is empty or occupied by enemy, take it
            // Second Case: Any pieces in the bishop's path excluding the new position blocks the bishop from moving
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

        // Case: Moves diagonally to upper left
        if (newPosition.x < initialPosition.x && newPosition.y > initialPosition.y) {
            let passedPosition = new Position(initialPosition.x - i, initialPosition.y + i);

            // Checks if a piece is in its path
            // First Case: If new position is empty or occupied by enemy, take it
            // Second Case: Any pieces in the bishop's path excluding the new position blocks the bishop from moving
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

        // Case: Moves diagonally to bottom right
        if (newPosition.x > initialPosition.x && newPosition.y < initialPosition.y) {
            let passedPosition = new Position(initialPosition.x + i, initialPosition.y - i);

            // Checks if a piece is in its path
            // First Case: If new position is empty or occupied by enemy, take it
            // Second Case: Any pieces in the bishop's path excluding the new position blocks the bishop from moving
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

        // Case: Moves diagonally to bottom left
        if (newPosition.x < initialPosition.x && newPosition.y < initialPosition.y) {
            let passedPosition = new Position(initialPosition.x - i, initialPosition.y - i);

            // Checks if a piece is in its path
            // First Case: If new position is empty or occupied by enemy, take it
            // Second Case: Any pieces in the bishop's path excluding the new position blocks the bishop from moving
            if (newPosition.equalsTo(passedPosition)) {
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

// Get all possible bishop moves of the piece
export const getPossibleBishopMoves = (bishop: ChessPiece, board: ChessPiece[]): Position[] => {
    // array to store all possible bishop moves
    const possibleMoves: Position[] = [];

    // Case: Upper right diagonal movement of bishop
    for (let i = 1; i < 8; i++) {
        const dest = new Position(bishop.position.x + i, bishop.position.y + i);

        // Check if square is not occupied
        if (!isSquareOccupied(dest, board)) {
            possibleMoves.push(dest);   // Push to array if possible
        } 
        // Check if square is occupied by eenemy
        else if (isSquareOccupiedByOppositeColor(dest, board, bishop.color)) {
            possibleMoves.push(dest);  
            break; 
        } else { /* Break from for loop */
            break;
        }
    }

    // Case: Upper left diagonal movement of bishop
    for (let i = 1; i < 8; i++) {
        const dest = new Position(bishop.position.x - i, bishop.position.y + i);

        // Check if square is not occupied
        if (!isSquareOccupied(dest, board)) {
            possibleMoves.push(dest);   // Push to array if possible
        } 
        // Check if square is occupied by eenemy
        else if (isSquareOccupiedByOppositeColor(dest, board, bishop.color)) {
            possibleMoves.push(dest);  
            break; 
        } else { /* Break from for loop */
            break;
        }
    }

    // Case: lower right diagonal movement of bishop
    for (let i = 1; i < 8; i++) {
        const dest = new Position(bishop.position.x + i, bishop.position.y - i);

        // Check if square is not occupied
        if (!isSquareOccupied(dest, board)) {
            possibleMoves.push(dest);   // Push to array if possible
        } 
        // Check if square is occupied by eenemy
        else if (isSquareOccupiedByOppositeColor(dest, board, bishop.color)) {
            possibleMoves.push(dest);  
            break; 
        } else { /* Break from for loop */
            break;
        }
    }

    // Case: Lower left diagonal movement of bishop
    for (let i = 1; i < 8; i++) {
        const dest = new Position(bishop.position.x - i, bishop.position.y - i);

        // Check if square is not occupied
        if (!isSquareOccupied(dest, board)) {
            possibleMoves.push(dest);   // Push to array if possible
        } 
        // Check if square is occupied by eenemy
        else if (isSquareOccupiedByOppositeColor(dest, board, bishop.color)) {
            possibleMoves.push(dest);  
            break; 
        } else { /* Break from for loop */
            break;
        }
    }

    return possibleMoves;
}