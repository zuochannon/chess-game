import { ColorTeam } from "../../data/enums/ChessEnums";
import { ChessPiece } from "../../data/models/ChessPiece";
import { Position } from "../../data/models/Position";
import { isSquareOccupied, isSquareOccupiedByOppositeColor} from "./GeneralLogic";

// Moves the King piece
export const kingMove = (initialPosition: Position, newPosition: Position, color: ColorTeam, boardState: ChessPiece[]) : boolean => {
    
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

// Export all possible king moves
export const getPossibleKingMoves = (king: ChessPiece, board: ChessPiece[], includeIllegal: boolean): Position[] => {
    // array to store all possible king moves
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
      
    for (const { dx, dy } of directions) {
        const newX = king.position.x + dx;
        const newY = king.position.y + dy;
        
        // Check if position is within board
        if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
            const destination = new Position(newX, newY);

            if (includeIllegal) {
                possibleMoves.push(destination);
                continue;
            }
      
            // Check if square is unoccupied or occupied by opponent to add as possible move
            if (!isSquareOccupied(destination, board) || isSquareOccupiedByOppositeColor(destination, board, king.color)) {
                possibleMoves.push(destination);
            }
        }
    }
      
    return possibleMoves;
}

// Castling move as possible move
export const getCastlingMoves = (king: ChessPiece, board: ChessPiece[]): Position[] => {
    // array to store all possible king moves
    const possibleMoves: Position[] = [];

    // If king has moved already, it can no longer castle
    if (king.hasMoved) return possibleMoves;

    // Get all rooks on same team that have not moved yet for castling
    const rooks = board.filter(p => p.isRook && p.color === king.color && !p.hasMoved);

    // Check rooks
    for (const rook of rooks) {
        // Check if king is castling on left or right rook
        const dir = (rook.position.x - king.position.x > 0) ? 1 : -1;

        const adjPosition = king.position.clone();
        adjPosition.x += dir;

        // Check if rook can be moved for castling
        if (!rook.possibleMoves?.some(m => m.equalsTo(adjPosition)))
            continue;

        // Get all possible rook moves that are on the same column as the king piece
        const squares = rook.possibleMoves.filter(m => m.y === king.position.y);

        // Get all enemy pieces on board
        const enemyPieces = board.filter(p => p.color !== king.color);

        let valid = true;

        // Go through all enemy pieces
        for (const enemy of enemyPieces) {
            // Check if enemy has possible moves listed and continue
            if (enemy.possibleMoves === undefined)
                continue;

            // Check each possible move of the enemy piece
            for (const move of enemy.possibleMoves) {
                // Check if at least one of the possible rook moves
                // has an enemy on the same level
                if (squares.some(s => s.equalsTo(move))) {
                    valid = false;
                }

                if (!valid)
                    break;
            }

            if (!valid)
                break;
        }

        if (!valid)
            continue;

        // Add castling move as possible move
        possibleMoves.push(rook.position.clone());
    }


    return possibleMoves;
}
