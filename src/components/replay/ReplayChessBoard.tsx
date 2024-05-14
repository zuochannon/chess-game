import React, { useEffect, useRef, useState } from "react";
import { COLUMNS, ROWS, GRID_SIZE, FULL_SIZE } from "../../data/constants/ChessConstants";
import "../../layouts/components/Chessboard.css";
import { Position } from "../../data/models/Position";
import ChessSquare from "../chessboard/ChessSquare";
import { ChessPiece } from "../../data/models/ChessPiece";
import { ColorTeam } from "@/data/enums/ChessEnums";

interface Props {
    pieces: ChessPiece[];
    offset: number;
    boardOrientation: ColorTeam;
}

export default function ReplayChessBoard({ playMove, pieces, offset, boardOrientation }: Props) {
    const chessboardRef = useRef<HTMLDivElement>(null);

    function renderBoard() {
        const board = [];
    
        for (let j = ROWS.length - 1; j >= 0; j--) {
            for (let i = 0; i < COLUMNS.length; i++) {
                const pos = boardOrientation === ColorTeam.WHITE ? new Position(i, j) : new Position(7 - i, 7 -j);
                const piece = pieces.find(p => p.position.equalsTo(pos));
                
                board.push(<ChessSquare key={`${i},${j}`} image={piece?.image} number={i + j + 2} lastMove={false} possibleMove={false} />);
            }
        }
        
        return board;
    }
    
    return (
        <>
            <div
                onContextMenu={(e) => e.preventDefault()}
                ref={chessboardRef}
                id="chessboard"
            >
                {renderBoard()}
            </div>
        </>
    );
}
