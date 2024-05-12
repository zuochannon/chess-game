import React, { useEffect, useRef, useState } from "react";
import { COLUMNS, ROWS, GRID_SIZE, FULL_SIZE } from "../../data/constants/ChessConstants";
import "../../layouts/components/Chessboard.css";
import { Position } from "../../data/models/Position";
import ChessSquare from "./ChessSquare";
import { ChessPiece } from "../../data/models/ChessPiece";
import { ColorTeam } from "@/data/enums/ChessEnums";

interface Props {
    playMove: (piece: ChessPiece, position: Position) => boolean;
    pieces: ChessPiece[];
    offset: number;
    boardOrientation: ColorTeam;
}

export default function Chessboard({ playMove, pieces, offset, boardOrientation }: Props) {
    const chessboardRef = useRef<HTMLDivElement>(null);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<Position>(new Position(-1, -1));
    const [lastMove, setLastMove] = useState<{ from: Position, to: Position } | null>(null);

    useEffect(() => {
        const handleMouseUp = (e: MouseEvent) => {
            if (activePiece && chessboardRef.current) {
                const isOutsideBoard = !chessboardRef.current.contains(e.target as Node);
                if (isOutsideBoard) {
                    resetPiecePosition();
                }
            }
        };

        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [activePiece]);

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;
        if (element.classList.contains("chess-piece") && chessboard) {
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft + window.scrollX) / GRID_SIZE);
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop + window.scrollY - offset - FULL_SIZE) / GRID_SIZE));
            const adjustedGrabPosition = boardOrientation === ColorTeam.WHITE ? new Position(grabX, grabY) : new Position(7 - grabX, 7 - grabY);
            setGrabPosition(adjustedGrabPosition);
            setActivePiece(element);
            element.style.position = "absolute";
            element.style.left = `${e.clientX - (GRID_SIZE / 2) + window.scrollX}px`;
            element.style.top = `${e.clientY - (GRID_SIZE / 2) - offset + window.scrollY}px`;
        }
    }

    function movePiece(e: React.MouseEvent) {
        if (activePiece && chessboardRef.current) {
            const minX = chessboardRef.current.offsetLeft - window.scrollX - (GRID_SIZE / 4);
            const maxX = chessboardRef.current.offsetLeft + chessboardRef.current.clientWidth - (GRID_SIZE / 4) * 3;
            const minY = chessboardRef.current.offsetTop - (GRID_SIZE / 4);
            const maxY = chessboardRef.current.offsetTop + chessboardRef.current.clientHeight - (GRID_SIZE / 4) * 3;
            const x = Math.max(minX, Math.min(maxX, e.clientX - (GRID_SIZE / 2) + window.scrollX));
            const y = Math.max(minY, Math.min(maxY, e.clientY - (GRID_SIZE / 2) - offset + window.scrollY));
            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
        }
    }

    function dropPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft + window.scrollX) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop + window.scrollY - offset - FULL_SIZE) / GRID_SIZE));
            const newPosition = boardOrientation === ColorTeam.WHITE ? new Position(x, y) : new Position(7 - x, 7 - y);
            const currentPiece = pieces.find(p => p.hasSamePositionAs(grabPosition));
            if (currentPiece && playMove(currentPiece, newPosition)) {
                setLastMove({ from: grabPosition, to: newPosition });
            }
            resetPiecePosition();
        }
    }

    function resetPiecePosition() {
        if (activePiece) {
            activePiece.style.position = "relative";
            activePiece.style.removeProperty('top');
            activePiece.style.removeProperty('left');
            setActivePiece(null);
        }
    }

    function renderBoard() {
        const board = [];
    
        for (let j = ROWS.length - 1; j >= 0; j--) {
            for (let i = 0; i < COLUMNS.length; i++) {
                const pos = boardOrientation === ColorTeam.WHITE ? new Position(i, j) : new Position(7 - i, 7 -j);
                const piece = pieces.find(p => p.position.equalsTo(pos));
                
                // Determine if this position is part of the last move
                const isLastMove = lastMove ? (lastMove.from.equalsTo(pos) || lastMove.to.equalsTo(pos)) : false;
                
                // Determine if there are possible moves from the currently active piece to this position
                let isPossibleMove = false;
                if (activePiece) {
                    const currentPiece = pieces.find(p => p.position.equalsTo(grabPosition));
                    isPossibleMove = currentPiece?.possibleMoves?.some(move => move.equalsTo(pos)) ?? false;
                }
    
                // Combine highlight conditions
                // const highlight = isLastMove || isPossibleMove;
                
                board.push(<ChessSquare key={`${i},${j}`} image={piece?.image} number={i + j + 2} lastMove={isLastMove} possibleMove={isPossibleMove} />);
            }
        }
        
        return board;
    }
    
    return (
        <>
            <div
                onMouseDown={grabPiece}
                onMouseMove={movePiece}
                onMouseUp={dropPiece}
                onContextMenu={(e) => e.preventDefault()}
                ref={chessboardRef}
                id="chessboard"
            >
                {renderBoard()}
            </div>
        </>
    );
}
