import { useRef, useState } from "react";
import { COLUMNS, ROWS, GRID_SIZE, FULL_SIZE, Piece, initialBoard } from "../../data/constants/ChessConstants";
import "../../layouts/components/Chessboard.css"
import { Position } from "../../data/models/Position";
import ChessSquare from "./ChessSquare";
import { NavigationBarHeight } from "../../data/constants/NavItems";
import ChessRulesController from "./ChessRulesController";
import { ColorTeam, PieceType } from "../../data/enums/ChessEnums";

export default function Chessboard() {
    const chessboardRef = useRef<HTMLDivElement>(null);
    const [pieces, setPieces] = useState<Piece[]>(initialBoard);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<Position>(new Position(0,0));
    const rules = new ChessRulesController();

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
            const currentPiece = pieces.find((p) => p.chessPiece.position.equalsTo(grabPosition));
            
            // Checks if current piece is valid
            if (currentPiece) {
                const validMove = rules.isValidMove(grabPosition, new Position(x,y), currentPiece.chessPiece.type, currentPiece.chessPiece.color, pieces);
                const enPassant = rules.isEnPassantMove(grabPosition, new Position(x, y), currentPiece.chessPiece.type, currentPiece.chessPiece.color, pieces);

                const pawnDir = (currentPiece.chessPiece.color === ColorTeam.WHITE) ? 1 : -1;

                if (enPassant) {
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if (piece.chessPiece.position.equalsTo(grabPosition)) {
                            piece.enPassant = false;
                            piece.chessPiece.position = new Position(x,y);
                            results.push(piece);
                        } else if (!(piece.chessPiece.position.equalsTo(new Position(x,y - pawnDir)))) {
                            if (piece.chessPiece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece);
                        }

                        return results;
                    }, [] as Piece[]);

                    setPieces(updatedPieces);
                }
                // Checks for valid move
                else if (validMove) {
                    // Handles removing piece when attack is successful
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if (piece.chessPiece.position.equalsTo(grabPosition)) {
                            
                            // Checks if it can perform en passant move
                            piece.enPassant = Math.abs(grabPosition.y - y) === 2 && piece.chessPiece.type === PieceType.PAWN;
                            piece.chessPiece.position = new Position(x,y);
                            results.push(piece);
                        } else if (!(piece.chessPiece.position.equalsTo(new Position(x,y)))) {
                            if (piece.chessPiece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece);
                        }

                        return results;
                    }, [] as Piece[]);

                    setPieces(updatedPieces);

                } else { /* Reset Piece Position */
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
            const piece = pieces.find(p => p.chessPiece.position.equalsTo(new Position(i, j)));
            let image = piece ? piece.chessPiece.image : undefined;

            board.push(<ChessSquare key={`${j},${i}`} image={image} number = {number} />);

            console.log(piece?.chessPiece.color, piece?.chessPiece.type, piece?.chessPiece.boardPosition);

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