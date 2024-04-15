import { useRef, useState } from "react";
import { COLUMNS, ROWS, GRID_SIZE, FULL_SIZE } from "../../data/constants/ChessConstants";
import "../../layouts/components/Chessboard.css"
import { Position } from "../../data/models/Position";
import ChessSquare from "./ChessSquare";

interface Piece {
    image: string
    position: Position
}
const initialBoard: Piece[] = [];

for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "b" : "w";
    const y = (p === 0) ? 7 : 0;

    initialBoard.push({image: `src/assets/chess/${type}R.png`, position: new Position(0, y)});
    initialBoard.push({image: `src/assets/chess/${type}N.png`, position: new Position(1, y)});
    initialBoard.push({image: `src/assets/chess/${type}B.png`, position: new Position(2, y)});
    initialBoard.push({image: `src/assets/chess/${type}K.png`, position: new Position(3, y)});
    initialBoard.push({image: `src/assets/chess/${type}Q.png`, position: new Position(4, y)});
    initialBoard.push({image: `src/assets/chess/${type}B.png`, position: new Position(5, y)});
    initialBoard.push({image: `src/assets/chess/${type}N.png`, position: new Position(6, y)});
    initialBoard.push({image: `src/assets/chess/${type}R.png`, position: new Position(7, y)});
}

for (let i = 0; i < 8; i++) {
    initialBoard.push({image: "src/assets/chess/bP.png", position: new Position(i, 6)});
}

for (let i = 0; i < 8; i++) {
    initialBoard.push({image: "src/assets/chess/wP.png", position: new Position(i, 1)});
}

export default function Chessboard() {
    const chessboardRef = useRef<HTMLDivElement>(null);
    const [pieces, setPieces] = useState<Piece[]>(initialBoard);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<Position>(new Position(-1,-1));

    // Grabs Piece on board
    function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;

        // Checks if element is chess piece
        if (element.classList.contains("chess-piece") && chessboard) {
            console.log(e);

            // Set grab position
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const grabY = Math.abs(
                Math.ceil((e.clientY - chessboard.offsetTop - FULL_SIZE) / GRID_SIZE)
            );
            setGrabPosition(new Position (grabX, grabY));

            // Set element position to center of mouse position
            const x = e.clientX - (GRID_SIZE / 2);
            const y = e.clientY - (GRID_SIZE * 2);
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            
            setActivePiece(element);
        }
    }

    // Moves Piece on board
    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;

        // Checks if activePiece and chessboard is not null
        if (activePiece && chessboard) {
            console.log(e);

            // Set element position to center of mouse position
            // Prevents pieces from moving out of board
            const minX = chessboard.offsetLeft - (GRID_SIZE / 4);
            const minY = chessboard.offsetTop - (GRID_SIZE / 4);
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - ((GRID_SIZE / 4) * 3);
            const maxY = chessboard.offsetTop + chessboard.clientHeight -  ((GRID_SIZE / 4) * 3);
            const x = e.clientX - (GRID_SIZE / 2);
            const y = e.clientY - (GRID_SIZE * 2);
            activePiece.style.position = "absolute";

            // Logs chessboard
            console.log(chessboard);

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
            const y = Math.floor((FULL_SIZE - (e.clientY - chessboard.offsetTop)) / GRID_SIZE);

            const currentPiece = pieces.find((p) =>
                p.position.samePosition(grabPosition)
            );

            // Set active piece to null
            setActivePiece(null);
        }
    }

    let board = [];

    // Draw the board
    for (let j = ROWS.length - 1; j >= 0; j--) {
        for (let i = 0; i < COLUMNS.length; i++) {
            const number = j + i + 2;
            let image = undefined;

            initialBoard.forEach(p => {
                if (p.position.x === i && p.position.y === j) {
                    image = p.image;
                }
            })

            board.push(<ChessSquare key={`${j},${i}`} image={image} number = {number} />);

        }
    }

    return (
        <div 
            onMouseDown={(e) => grabPiece(e)}  
            onMouseMove={(e) => movePiece(e)} 
            onMouseUp={(e) => dropPiece(e)} 
            id="chessboard"
            ref = {chessboardRef}
        >
            {board}
        </div>
    );
}