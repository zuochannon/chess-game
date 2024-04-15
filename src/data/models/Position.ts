
// Handles the positioning of the pieces
export class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Checks 
    samePosition(otherPosition: Position): boolean {
        return this.x === otherPosition.x && this.y === otherPosition.y;
    }

    // Clones position
    clone(): Position {
        return new Position(this.x, this.y);
    }
}