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
export const getPossibleKnightMoves = (knight: ChessPiece, board: ChessPiece[], includeIllegal: boolean): Position[] => {
    const possibleMoves: Position[] = [];
    const offsets: [number, number][] = [
        [1, 2], [1, -2], [-1, 2], [-1, -2], // Vertical moves first
        [2, 1], [2, -1], [-2, 1], [-2, -1]  // Horizontal moves second
    ];

    for (const [dx, dy] of offsets) {
        // Gets knight's possible destination position
        const newX = knight.position.x + dx;
        const newY = knight.position.y + dy;

        // Check if move is valid
        if (newX < 0 || newX > 7 || newY < 0 || newY > 7) continue;

        const dest = new Position(newX, newY);
        if (includeIllegal) {
            possibleMoves.push(dest);
            continue;
        }
  
        if ((!isSquareOccupied(dest, board) || isSquareOccupiedByOppositeColor(dest, board, knight.color))) {
            possibleMoves.push(dest);
        }
    }

    return possibleMoves;
}