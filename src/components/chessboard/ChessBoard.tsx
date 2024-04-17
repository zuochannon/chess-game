import { useRef, useState } from "react";
import { COLUMNS, ROWS, GRID_SIZE, FULL_SIZE } from "../../data/constants/ChessConstants";
import "../../layouts/components/Chessboard.css"
import { Position } from "../../data/models/Position";
import ChessSquare from "./ChessSquare";
import { NavigationBarHeight } from "../../data/constants/NavItems";
import ChessRulesController from "./ChessRulesController";
import { ColorTeam, PieceType } from "../../data/enums/ChessEnums";

export interface Piece {
    image: string;
    position: Position;
    type: PieceType;
    color: ColorTeam;
    enPassant?: boolean;
}
const initialBoard: Piece[] = [];

for (let p = 0; p < 2; p++) {
    const team = (p === 0) ? ColorTeam.BLACK : ColorTeam.WHITE;
    const type = (team === ColorTeam.BLACK) ? "b" : "w";
    const y = (p === 0) ? 7 : 0;

    initialBoard.push({image: `src/assets/chess/${type}R.png`, position: new Position(0, y), type: PieceType.ROOK, color: team});
    initialBoard.push({image: `src/assets/chess/${type}N.png`, position: new Position(1, y), type: PieceType.KNIGHT, color: team});
    initialBoard.push({image: `src/assets/chess/${type}B.png`, position: new Position(2, y), type: PieceType.BISHOP, color: team});
    initialBoard.push({image: `src/assets/chess/${type}K.png`, position: new Position(3, y), type: PieceType.KING, color: team});
    initialBoard.push({image: `src/assets/chess/${type}Q.png`, position: new Position(4, y), type: PieceType.QUEEN, color: team});
    initialBoard.push({image: `src/assets/chess/${type}B.png`, position: new Position(5, y), type: PieceType.BISHOP, color: team});
    initialBoard.push({image: `src/assets/chess/${type}N.png`, position: new Position(6, y), type: PieceType.KNIGHT, color: team});
    initialBoard.push({image: `src/assets/chess/${type}R.png`, position: new Position(7, y), type: PieceType.ROOK, color: team});
}

for (let i = 0; i < 8; i++) {
    initialBoard.push({image: "src/assets/chess/bP.png", position: new Position(i, 6), type: PieceType.PAWN, color: ColorTeam.BLACK});
}

for (let i = 0; i < 8; i++) {
    initialBoard.push({image: "src/assets/chess/wP.png", position: new Position(i, 1), type: PieceType.PAWN, color: ColorTeam.WHITE});
}

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
            const currentPiece = pieces.find((p) => p.position.equalsTo(grabPosition));
            
            // Checks if current piece is valid
            if (currentPiece) {
                const validMove = rules.isValidMove(grabPosition, new Position(x,y), currentPiece.type, currentPiece.color, pieces);
                const enPassant = rules.isEnPassantMove(grabPosition, new Position(x, y), currentPiece.type, currentPiece.color, pieces);

                const pawnDir = (currentPiece.color === ColorTeam.WHITE) ? 1 : -1;

                if (enPassant) {
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if (piece.position.equalsTo(grabPosition)) {
                            piece.enPassant = false;
                            piece.position = new Position(x,y);
                            results.push(piece);
                        } else if (!(piece.position.equalsTo(new Position(x,y - pawnDir)))) {
                            if (piece.type === PieceType.PAWN) {
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
                        if (piece.position.equalsTo(grabPosition)) {
                            if (Math.abs(grabPosition.y - y) === 2 && piece.type === PieceType.PAWN) {
                                piece.enPassant = true;
                            } else {
                                piece.enPassant = false;
                            }
                            
                            piece.position = new Position(x,y);
                            results.push(piece);
                        } else if (!(piece.position.equalsTo(new Position(x,y)))) {
                            if (piece.type === PieceType.PAWN) {
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