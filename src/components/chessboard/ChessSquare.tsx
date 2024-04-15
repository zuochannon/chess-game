import { useState, useMemo } from "react";
import { Square, BoardCoordinates, Piece } from "../../data/types/ChessTypes";

export function ChessSquare() {

    // Initialize state variable 'states' with an empty object
    // This represents positions of each square on the board
    const [squares] = useState<{ [square in Square] ?: BoardCoordinates}>({});

    return (
        <div>

        </div>
    );
}