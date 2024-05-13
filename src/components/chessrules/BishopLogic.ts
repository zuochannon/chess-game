import { ColorTeam } from "../../data/enums/ChessEnums";
import { ChessPiece } from "../../data/models/ChessPiece";
import { Position } from "../../data/models/Position";
import { isSquareOccupied, isSquareOccupiedByOpposingKing, isSquareOccupiedByOppositeColor } from "./GeneralLogic";

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

// Get all possible bishop moves
export const getPossibleBishopMoves = (bishop: ChessPiece, board: ChessPiece[], includeIllegal: boolean, includeOnlyMovesPastKing: boolean = false): Position[] => {
    const possibleMoves: Position[] = [];

    const directions = [
        { dx: 1, dy: 1 },   // Upper right
        { dx: 1, dy: -1 },  // Bottom right
        { dx: -1, dy: -1 }, // Bottom left
        { dx: -1, dy: 1 },  // Top left
    ];

    // Cycle through the directions
    for (const {dx, dy} of directions) {
        for (let i = 1; i < 8; i++) {
            const newX = bishop.position.x + dx * i;
            const newY = bishop.position.y + dy * i;

            // Prevent out-of-board moves from being included
            if (newX < 0 || newX > 7 || newY < 0 || newY > 7) break;

            let dest = new Position(bishop.position.x + dx * i, bishop.position.y + dy * i);

            if (includeIllegal) {
                if (isSquareOccupiedByOpposingKing(dest, board, bishop.color) && includeOnlyMovesPastKing) {
                    // Only include moves past the opposing king
                    for (let j = i; j < 8; j++) {
                        const pastX = bishop.position.x + dx * j;
                        const pastY = bishop.position.y + dy * j;

                        if (pastX < 0 || pastX > 7 || pastY < 0 || pastY > 7) break;

                        possibleMoves.push(new Position(pastX, pastY));
                    }
                }

                if (!includeOnlyMovesPastKing) {
                    possibleMoves.push(dest);
                }

                continue;
            }

            if (isSquareOccupied(dest, board)) {
                if (isSquareOccupiedByOppositeColor(dest, board, bishop.color)) {
                    possibleMoves.push(dest);
                }
                break;
            } else {
                possibleMoves.push(dest);
            }

            dest = new Position(dest.x + dx, dest.y + dy);
        }
    }

    return possibleMoves;
}
