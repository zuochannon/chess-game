import { useRef, useState } from "react";
import { COLUMNS, ROWS, GRID_SIZE, FULL_SIZE } from "../../data/constants/ChessConstants";
import "../../layouts/components/Chessboard.css"
import { Position } from "../../data/models/Position";
import { NavigationBarHeight } from "../../data/constants/NavItems";
import ChessSquare from "./ChessSquare";
import { ChessPiece } from "../../data/models/ChessPiece";

interface Props {
    playMove: (piece: ChessPiece, position: Position) => boolean;
    pieces: ChessPiece[];
}

export default function Chessboard({playMove, pieces} : Props) {
    const chessboardRef = useRef<HTMLDivElement>(null);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<Position>(new Position(-1,-1));

    // Grabs Piece on board
    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;

        // Checks if element is chess piece
        if (element.classList.contains("chess-piece") && chessboard) {

            // Set grab position
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop  - NavigationBarHeight - FULL_SIZE) / GRID_SIZE));
            setGrabPosition(new Position (grabX, grabY));

            // Set element position to center of mouse position
            const x = e.clientX - (GRID_SIZE / 2);
            const y = e.clientY - (GRID_SIZE / 2) - NavigationBarHeight;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            
            // Set active piece
            setActivePiece(element);
        }
    }

    // Moves Piece on board
    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;

        // Checks if activePiece and chessboard is not null
        if (activePiece && chessboard) {

            // Set element position to center of mouse position
            // Prevents pieces from moving out of board
            const minX = chessboard.offsetLeft - (GRID_SIZE / 4);
            const minY = chessboard.offsetTop - (GRID_SIZE / 4);
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - ((GRID_SIZE / 4) * 3);
            const maxY = chessboard.offsetTop + chessboard.clientHeight - ((GRID_SIZE / 4) * 3);
            const x = e.clientX - (GRID_SIZE / 2);
            const y = e.clientY - (GRID_SIZE / 2) - NavigationBarHeight;
            activePiece.style.position = "absolute";

            // Set x-position of piece inside board and along mouse cursor
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            } else {
                activePiece.style.left = `${x}px`;
            }

            // Set y-position of piece inside board and along mouse cursor
            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            } else {
                activePiece.style.top = `${y}px`;
            }

        }
    }

    // Drops piece on board
    function dropPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;

        // Checks if there is a piece and chessboard
        if (activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - NavigationBarHeight - FULL_SIZE) / GRID_SIZE));

            // Gets the current piece
            const currentPiece = pieces.find((p) => p.hasSamePositionAs(grabPosition));
            
            // Checks if current piece is valid
            if (currentPiece) {

                var successfulMove = playMove(currentPiece.clone(), new Position(x,y));
                
                if (!successfulMove) { /* Reset Piece Position */
                    activePiece.style.position = "relative";
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                }
            }

            // Set active piece to null
            setActivePiece(null);
        }
    }

    let board = [];

    // Render the chess pieces on the board
    for (let j = ROWS.length - 1; j >= 0; j--) {
        for (let i = 0; i < COLUMNS.length; i++) {
            const number = j + i + 2;
            const piece = pieces.find(p => p.hasSamePositionAs(new Position(i, j)));
            let image = piece ? piece.image : undefined;

            let currentPiece = activePiece != null ? pieces.find(p => p.hasSamePositionAs(grabPosition)) : undefined;
            let highlight = currentPiece?.possibleMoves ? currentPiece.possibleMoves.some(p => p.equalsTo(new Position(i, j))) : false;
      
            board.push(<ChessSquare key={`${j},${i}`} image={image} number = {number} highlight = {highlight} />);
        }
    }

    return (
        <>
            <div 
                onMouseDown={(e) => grabPiece(e)}  
                onMouseMove={(e) => movePiece(e)} 
                onMouseUp={(e) => dropPiece(e)} 
                id="chessboard"
                ref = {chessboardRef}
            >
                {board}
            </div>
        </>
    );
}