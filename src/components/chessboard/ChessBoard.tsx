import { useRef, useState } from "react";
import { COLUMNS, ROWS } from "../../data/constants/ChessPositions";
import "../../layouts/components/Chessboard.css"
import { Position } from "../../data/models/Position";
import ChessSquare from "./ChessSquare";

interface Piece {
    image: string
    position: Position
}
const pieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "b" : "w";
    const y = (p === 0) ? 7 : 0;

    pieces.push({image: `src/assets/chess/${type}R.png`, position: new Position(0, y)});
    pieces.push({image: `src/assets/chess/${type}N.png`, position: new Position(1, y)});
    pieces.push({image: `src/assets/chess/${type}B.png`, position: new Position(2, y)});
    pieces.push({image: `src/assets/chess/${type}K.png`, position: new Position(3, y)});
    pieces.push({image: `src/assets/chess/${type}Q.png`, position: new Position(4, y)});
    pieces.push({image: `src/assets/chess/${type}B.png`, position: new Position(5, y)});
    pieces.push({image: `src/assets/chess/${type}N.png`, position: new Position(6, y)});
    pieces.push({image: `src/assets/chess/${type}R.png`, position: new Position(7, y)});
}

for (let i = 0; i < 8; i++) {
    pieces.push({image: "src/assets/chess/bP.png", position: new Position(i, 6)});
}

for (let i = 0; i < 8; i++) {
    pieces.push({image: "src/assets/chess/wP.png", position: new Position(i, 1)});
}

export function Chessboard() {

    let board = [];

    // Draw the board
    for (let j = ROWS.length - 1; j >= 0; j--) {
        for (let i = 0; i < COLUMNS.length; i++) {
            const number = j + i + 2;
            let image = undefined;

            pieces.forEach(p => {
                if (p.position.x === i && p.position.y === j) {
                    image = p.image;
                }
            })

            board.push(<ChessSquare image={image} number = {number} />);

        }
    }

    return (
        <div id = "chessboard">
            {board}
        </div>
    );
}