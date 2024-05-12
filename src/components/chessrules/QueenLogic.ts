import { ColorTeam } from "../../data/enums/ChessEnums";
import { ChessPiece } from "../../data/models/ChessPiece";
import { Position } from "../../data/models/Position";
import { isSquareOccupied, isSquareOccupiedByOpposingKing, isSquareOccupiedByOppositeColor } from "./GeneralLogic";

// Moves the Queen piece
export const queenMove = (initialPosition: Position, newPosition: Position, color: ColorTeam, boardState: ChessPiece[]) : boolean => {
    
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

// Export all possible queen moves
export const getPossibleQueenMoves = (queen: ChessPiece, board: ChessPiece[], includeIllegal: boolean, includeOnlyMovesPastKing: boolean = false): Position[] => {
    // Store all possible moves for the queen piece
    const possibleMoves: Position[] = [];
    
    const directions = [
      { dx: 0, dy: 1 },   // Top
      { dx: 0, dy: -1 },  // Bottom
      { dx: -1, dy: 0 },  // Left
      { dx: 1, dy: 0 },   // Right
      { dx: 1, dy: 1 },   // Upper right
      { dx: 1, dy: -1 },  // Bottom right
      { dx: -1, dy: -1 }, // Bottom left
      { dx: -1, dy: 1 },  // Top left
    ];
  
    // Goes through all possible moves of queen piece
    for (const { dx, dy } of directions) {
        let flag = true;
        for (let i = 1; i < 8; i++) {
            const newX = queen.position.x + dx * i;
            const newY = queen.position.y + dy * i;
            
            // Prevent out-of-board moves from being included
            if (newX < 0 || newX > 7 || newY < 0 || newY > 7) break;
    
            const dest = new Position(newX, newY);

            if (includeIllegal) {
                if (flag && includeOnlyMovesPastKing) {
                    // Only include moves past the opposing king
                    possibleMoves.push(dest);
                }

                if (!isSquareOccupiedByOpposingKing(dest, board, queen.color)) {
                    flag = false;
                    break;
                }


                if (!includeOnlyMovesPastKing) {
                    possibleMoves.push(dest);
                }

                continue;
            }
    
            if (!isSquareOccupied(dest, board)) {
                possibleMoves.push(dest);
            } else if (isSquareOccupiedByOppositeColor(dest, board, queen.color)) {
                possibleMoves.push(dest);
                break;
            } else {
                break;
            }
        }
    }
  
    return possibleMoves;
  }
  