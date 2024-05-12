import { getCastlingMoves, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves } from "../../components/chessrules";
import { ColorTeam, PieceType } from "../enums/ChessEnums";
import { ChessPiece, Pawn } from "./ChessPiece";
import { Position } from "./Position";

// Handles chessboard moves, such as possible moves that each piece can do
export class Board {
    pieces: ChessPiece[];
    totalTurns: number;
    winningTeam ?: ColorTeam;
    private kingCheck: boolean;
    private checkmate: boolean;
    private stalemate: boolean;

    constructor(pieces: ChessPiece[], totalTurns: number) {
        this.pieces = pieces;
        this.totalTurns = totalTurns;
        this.kingCheck = false;
        this.checkmate = false;
        this.stalemate = false;
    }

    // Check whose turn it is
    get currentTeam(): ColorTeam {
        return (this.totalTurns % 2 === 0) ? ColorTeam.BLACK : ColorTeam.WHITE;
    }

    // Process all possible moves of the pieces
    processAllPossibleMoves() {

        if (!(this.pieces.some(p => p.isKing && p.color === ColorTeam.WHITE) && this.pieces.some(p => p.color === ColorTeam.BLACK && p.isKing))) {
            this.winningTeam = ColorTeam.ILLEGAL;
            return;
        }

        // Process possible moves for all pieces on the board
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getMoves(piece, this.pieces, false);
        }

        // Get possible castling moves
        for (const king of this.pieces.filter(p => p.isKing)) {
            if (king.possibleMoves === undefined)
                continue;
            // Add castling moves into possible king moves
            king.possibleMoves = [...king.possibleMoves, ...getCastlingMoves(king, this.pieces)];
        }

        // Check if playing team's moves are valid
        this.checkCurrentMoves();

        // Remove possible moves for team not playing
        for (const piece of this.pieces.filter(p => p.color !== this.currentTeam)) {
            piece.possibleMoves = [];
        }

        // Check if playing team has any moves left (Checkmate condition)
        if (this.isCheckmate() && this.kingCheck) {
            this.winningTeam = (this.currentTeam === ColorTeam.WHITE) ? ColorTeam.BLACK : ColorTeam.WHITE;
            return;
        }

    }

    // Return if checkmate occurs
    isCheckmate(): boolean {
        this.checkmate = !this.pieces.filter(p => p.color === this.currentTeam).some(p => p.possibleMoves !== undefined && p.possibleMoves.length > 0);
        return this.checkmate && this.kingCheck;
    }

    getKingCheck(): boolean {
        return this.kingCheck;
    }

    getStalemate(): boolean {
        return this.stalemate;
    }

    // Get valid moves of the piece type
    getMoves(piece: ChessPiece, board: ChessPiece[], includeIllegal: boolean, includeOnlyMovesPastKing: boolean = false): Position[] {
        switch(piece.type) {
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, board);
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, board, includeIllegal);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, board, includeIllegal, includeOnlyMovesPastKing);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece, board, includeIllegal, includeOnlyMovesPastKing);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, board, includeIllegal, includeOnlyMovesPastKing);
            case PieceType.KING:
                return getPossibleKingMoves(piece, board, includeIllegal);
            default: 
                return [];
        }
    }

    // Check current moves
    checkCurrentMoves() {

        // Loops through all pieces of the current playing team
        for (let piece of this.pieces.filter(p => p.color === this.currentTeam)) {
            
            if (piece.possibleMoves === undefined) continue;

            // Get every possible move of each piece on the playing team
            for (const move of piece.possibleMoves) {
                let sBoard = this.clone();

                // Remove piece at destination
                sBoard.pieces = sBoard.pieces.filter(p => !p.hasSamePositionAs(move));

                // Get the king of the playing team
                const cKing = sBoard.pieces.find(p => p.isKing && p.color === this.currentTeam)!.clone();

                // Update the variable indicating whether the king is in check
                this.kingCheck = this.isKingInCheck(sBoard, cKing, piece, move);

                // Check if king can be in check 
                this.canKingBeInCheck(cKing, sBoard, piece); 
                
                // Check for stalemate
                if (!this.kingCheck) {
                    this.stalemate = this.isStalemate(sBoard);
                }              

            }

        }

    }

    // Checks if king can be in check
    // If so, it filters out all moves that endangers the king
    private canKingBeInCheck(cKing: ChessPiece, sBoard: Board, piece: ChessPiece) {

        for (const opponent of sBoard.pieces.filter(p => p.color !== sBoard.currentTeam)) {
            opponent.possibleMoves = sBoard.getMoves(opponent, sBoard.pieces, false);

            if (piece.isKing) { /* Filter out moves that can put the king in check */
                if (opponent.isPawn) {
                    const leftCapture = new Position(opponent.position.x - 1, opponent.position.y + 1);
                    const rightCapture = new Position(opponent.position.x + 1, opponent.position.y + 1);

                    piece.possibleMoves = piece.possibleMoves?.filter(m => !(m.equalsTo(leftCapture) || m.equalsTo(rightCapture)) || m.equalsTo(opponent.position));
                } else {
                    let list = [];
                    for (const pos of sBoard.getMoves(opponent, sBoard.pieces, true, true)) {
                        list.push(pos);
                    }

                    piece.possibleMoves = piece.possibleMoves?.filter(move => 
                        !(opponent.possibleMoves?.some(m => m.equalsTo(move))) 
                        || move.equalsTo(opponent.position)).filter(move => !list.some(m => m.equalsTo(move)));
                }
            } else { /* Filter out moves that can leave the king vulnerable to immediate check */
                cKing.possibleMoves = sBoard.getMoves(cKing, sBoard.pieces, true);
                piece.possibleMoves = piece.possibleMoves?.filter(move => !(opponent.possibleMoves?.some(m => m.equalsTo(move)) && cKing.possibleMoves?.some(m => m.equalsTo(move))));
                
            }
        }
    }
 
    // Return if king is in check
    private isKingInCheck(sBoard: Board, cKing: ChessPiece, piece: ChessPiece, playMove: Position): boolean {

        // Initialize a flag to track whether the current player's king is in check
        let currentTeamKingInCheck = false;

        // Loops through all opponent pieces and update their possible moves
        for (const opponent of sBoard.pieces.filter(p => p.color !== sBoard.currentTeam)) {
            
            opponent.possibleMoves = sBoard.getMoves(opponent, sBoard.pieces, false);

            // Check if the opponent's piece can attack the current player's king
            if (opponent.possibleMoves.some(m => m.equalsTo(cKing.position))) {
                currentTeamKingInCheck = true;

                // Filter out any moves of the current player's piece that would leave the king in check
                if (piece.isKing) {
                    piece.possibleMoves = piece.possibleMoves?.filter(move => opponent.possibleMoves?.some(m => !m.equalsTo(move)) || move.equalsTo(opponent.position));
                } else {
                    piece.possibleMoves = piece.possibleMoves?.filter(move => !move.equalsTo(playMove) || (opponent.possibleMoves?.filter(m => m.equalsTo(move)) && cKing.possibleMoves?.some(m => m.equalsTo(move))));
                }

            }
        }

        return currentTeamKingInCheck;
    }

    // Return if stalemate occurs
    private isStalemate(sBoard: Board): boolean {
        let stalemate = false;

        // Check if there are no legal moves for the current player
        const noLegalMoves = this.pieces
        .filter(p => p.color === sBoard.currentTeam)
        .every(p => p.possibleMoves === undefined || p.possibleMoves.length === 0);

        // If there are no legal moves, it's a stalemate
        if (noLegalMoves) {
            stalemate = true;
            this.winningTeam = ColorTeam.DRAW;
        } else {
            stalemate = false;
            this.winningTeam = undefined;
        }

        return stalemate;
    }

    // Check if move is valid
    playMove(enPassantMove: boolean, validMove: boolean, playedPiece: ChessPiece, dest: Position): boolean {
        // Get pawn direction based on team color
        const pawnDir = playedPiece.color === ColorTeam.WHITE ? 1 : -1;
        const destPiece = this.pieces.find(p => p.hasSamePositionAs(dest));

        // Special Case: Castling
        if (playedPiece.isKing && destPiece?.isRook && destPiece.color === playedPiece.color) {

            // Castle left or right
            const dir = (destPiece.position.x - playedPiece.position.x > 0) ? 1 : -1;

            // Set new king position in terms of x-position
            const newKingPosition = playedPiece.position.x + dir * 2;

            // Updates the play field to reflect castling
            this.pieces = this.pieces.map(p => {
                if (p.hasSamePiecePositionAs(playedPiece)) {
                    p.position.x = newKingPosition;
                }
                else if (p.hasSamePiecePositionAs(destPiece)) {
                    p.position.x = newKingPosition - dir;
                }
                return p;
            });

            this.processAllPossibleMoves();
            return true;
        }

        // Special Case: En Passant; Checks moves made for en passant to occur
        if (enPassantMove) {
            this.pieces = this.pieces.reduce((results, piece) => {

                // Check if the played piece has same position as piece
                if (piece.hasSamePiecePositionAs(playedPiece)) {
                    if (piece.isPawn)
                        (piece as Pawn).enPassant = false;

                    piece.position = dest;
                    piece.hasMoved = true;
                    results.push(piece);
                }
                else if (!piece.hasSamePositionAs(new Position(dest.x, dest.y - pawnDir))) {
                    if (piece.isPawn)
                        (piece as Pawn).enPassant = false;
                    results.push(piece);
                }

                return results;
            }, [] as ChessPiece[]);

            this.processAllPossibleMoves();
        }
        // Case: Non-special moves 
        else if (validMove) {
            // Update position of piece
            this.pieces = this.pieces.reduce((results, piece) => {

                // Refers to piece being moved by player
                if (piece.hasSamePiecePositionAs(playedPiece)) {

                    // Special Move: En Passant
                    if (piece.isPawn)
                        (piece as Pawn).enPassant = Math.abs(playedPiece.position.y - dest.y) === 2;
                
                    piece.position = dest;
                    piece.hasMoved = true;
                    results.push(piece);
                } 
                // Check if piece is not same position as destination of played piece
                else if (!piece.hasSamePositionAs(dest)) {
                    if (piece.isPawn)
                        (piece as Pawn).enPassant = false;
                    results.push(piece);
                }

                return results;
            }, [] as ChessPiece[]);

            this.processAllPossibleMoves();
        }
        else {
            return false;
        }

        return true;
    }

    // Get the chess piece at a specific position on the board
    getPieceAtPosition(position: Position): ChessPiece | undefined {
        return this.pieces.find(piece => piece.position.equalsTo(position));
    }

    // Clone the chessboard
    clone(): Board {
        return new Board(this.pieces.map(p => p.clone()),
            this.totalTurns);
    }
}