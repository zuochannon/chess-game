import { useEffect, useRef, useState } from "react";
import { COLUMNS, ROWS, GRID_SIZE, FULL_SIZE } from "../../data/constants/ChessConstants";
import "../../layouts/components/Chessboard.css"
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

export default function Chessboard({ playMove, pieces, offset, boardOrientation } : Props) {
    const chessboardRef = useRef<HTMLDivElement>(null);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<Position>(new Position(-1,-1));

    useEffect(() => {
        // Add event listener to handle mouse release anywhere on the page
        const handleMouseUp = (e: MouseEvent) => {

            if (activePiece && chessboardRef.current) {
                const isOutsideBoard = !chessboardRef.current.contains(e.target as Node);
                if (isOutsideBoard) {
                    // Reset the position of the active piece if dropped outside the board
                    resetPiecePosition();
                }
            }
        };

        document.addEventListener("mouseup", handleMouseUp);


        return () => {
            // Clean up the event listener when the component unmounts
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [activePiece]);

    // Grabs Piece on board
    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;

        // Checks if element is chess piece
        if (element.classList.contains("chess-piece") && chessboard) {

            // Set grab position
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft + window.scrollX) / GRID_SIZE);
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop + window.scrollY - offset - FULL_SIZE) / GRID_SIZE));
            
            // Change grab position based on orientation of board
            if (boardOrientation === ColorTeam.WHITE)
                setGrabPosition(new Position (grabX, grabY));
            else
                setGrabPosition(new Position (7 - grabX, 7 - grabY));

            // Set element position to center of mouse position
            const x = e.clientX - (GRID_SIZE / 2) + window.scrollX;
            const y = e.clientY - (GRID_SIZE / 2) - offset + window.scrollY;
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
            const minX = chessboard.offsetLeft - window.scrollX - (GRID_SIZE / 4);
            const minY = chessboard.offsetTop - window.scrollY - (GRID_SIZE / 4);
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - ((GRID_SIZE / 4) * 3);
            const maxY = chessboard.offsetTop + chessboard.clientHeight - ((GRID_SIZE / 4) * 3);
            const x = e.clientX - (GRID_SIZE / 2) + window.scrollX;
            const y = e.clientY - (GRID_SIZE / 2) - offset + window.scrollY;
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
            const x = Math.floor((e.clientX - chessboard.offsetLeft + window.scrollX) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop + window.scrollY - offset - FULL_SIZE) / GRID_SIZE));

            // Get current piece
            const currentPiece = pieces.find((p) => p.hasSamePositionAs(grabPosition));

            // Checks if current piece is valid
            if (currentPiece) {

                let successfulMove = false;

                // Change drop orientation based on board
                if (boardOrientation === ColorTeam.WHITE)
                    successfulMove = playMove(currentPiece.clone(), new Position(x,y));
                else {
                    successfulMove = playMove(currentPiece.clone(), new Position(7 - x, 7 - y));
                }

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

    // Reset position of the active piece
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
    
        if (boardOrientation === ColorTeam.WHITE) { /* WHITE BOARD */
            for (let j = ROWS.length - 1; j >= 0; j--) {
                for (let i = 0; i < COLUMNS.length; i++) {
                    const number = j + i + 2;
                    const piece = pieces.find(p => p.hasSamePositionAs(new Position(i, j)));
                    let image = piece ? piece.image : undefined;
        
                    let currentPiece = activePiece != null ? pieces.find(p => p.hasSamePositionAs(grabPosition)) : undefined;
                    let highlight = (currentPiece?.possibleMoves) ? currentPiece.possibleMoves.some(p => p.equalsTo(new Position(i, j))) : false;

                    board.push(<ChessSquare key={`${j},${i}`} image={image} number={number} highlight={highlight} />);
                }
            }
        } else { /* BLACK BOARD */
            for (let i = 0; i < COLUMNS.length; i++) {
                for (let j = ROWS.length - 1; j >= 0; j--) {
                    const number = j + i + 2;
                    const piece = pieces.find(p => p.hasSamePositionAs(new Position(j, i)));
                    let image = piece ? piece.image : undefined;
        
                    let currentPiece = (activePiece != null) ? pieces.find(p => p.hasSamePositionAs(grabPosition)) : undefined;
                    let highlight = (currentPiece?.possibleMoves) ? currentPiece.possibleMoves.some(p => p.equalsTo(new Position(j, i))) : false;
        
                    board.push(<ChessSquare key={`${j},${i}`} image={image} number={number} highlight={highlight} />);
                }
            }
        }
    
        return board;
    }
    
    const board = renderBoard();

    //console.log(board);

    return (
        <>
            <div 
                onMouseDown={(e) => grabPiece(e)}  
                onMouseMove={(e) => movePiece(e)} 
                onMouseUp={(e) => dropPiece(e)} 
                onContextMenu={(e) => e.preventDefault()} // Prevents right-click menu
                id="chessboard"
                ref = {chessboardRef}
            >
                {board}
            </div>
        </>
    );
}