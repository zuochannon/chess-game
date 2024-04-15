import React from "react";
import { COLUMNS, ROWS } from "../../data/constants/ChessPositions";
import "../../layouts/components/Chessboard.css"

export function Chessboard() {

    let board = [];

    // Draw the board
    for (let j = ROWS.length - 1; j >= 0; j--) {
        for (let i = 0; i < COLUMNS.length; i++) {
            const number = j + i + 2;

            if (number % 2 === 0) {
                board.push(
                    <div className="tile dark-tile"></div>
                );
            } else {
                board.push(
                    <div className="tile light-tile"></div>
                );
            }
        }
    }

    return (
        <div id = "chessboard">
            {board}
        </div>
    );
}