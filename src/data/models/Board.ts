import { getCastlingMoves, getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves } from "../../components/chessrules";
import { ColorTeam, PieceType } from "../enums/ChessEnums";
import { ChessPiece, Pawn } from "./ChessPiece";
import { Position } from "./Position";

// Handles chessboard moves, such as possible moves that each piece can do
export class Board {
    pieces: ChessPiece[];
    totalTurns: number;
    winningTeam ?: ColorTeam;

    constructor(pieces: ChessPiece[], totalTurns: number) {
        this.pieces = pieces;
        this.totalTurns = totalTurns;
    }

    // Check whose turn it is
    get currentTeam(): ColorTeam {
        return (this.totalTurns % 2 === 0) ? ColorTeam.BLACK : ColorTeam.WHITE;
    }

    // Process all possible moves of the pieces
    processAllPossibleMoves() {

        // Process possible moves for all pieces on the board
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getValidMoves(piece, this.pieces);
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
        if (this.pieces.filter(p => p.color === this.currentTeam).some(p => p.possibleMoves !== undefined && p.possibleMoves.length > 0))
            return;

        this.winningTeam = (this.currentTeam === ColorTeam.WHITE) ? ColorTeam.BLACK : ColorTeam.WHITE;
    }

    // Get valid moves of the piece type
    getValidMoves(piece: ChessPiece, board: ChessPiece[]): Position[] {
        switch(piece.type) {
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, board);
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, board);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, board);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece, board);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, board);
            case PieceType.KING:
                return getPossibleKingMoves(piece, board);
            default: 
                return [];
        }
    }
    
    // Check current moves
    checkCurrentMoves() {

        // Loops through all pieces of the current playing team
        for (const piece of this.pieces.filter(p => p.color === this.currentTeam)) {

            // Check if piece has possible moves
            if (piece.possibleMoves === undefined) continue;

            // Get every possible move of each piece on the playing team
            for (const move of piece.possibleMoves) {
                const sBoard = this.clone();

                // Remove piece at destination
                sBoard.pieces = sBoard.pieces.filter(p => !p.hasSamePositionAs(move));
                
                // Get piece of cloned board
                const clonedPiece = sBoard.pieces.find(p => p.hasSamePiecePositionAs(piece))!;
                clonedPiece.position = move.clone();

                // Get the king of the playing team
                const cKing = sBoard.pieces.find(p => p.isKing && p.color === this.currentTeam)!;
           
                // Loops through all opponent pieces and update their possible moves
                // Also, conduct checks (playing team's king is in danger)
                for (const opponent of sBoard.pieces.filter(p => p.color !== sBoard.currentTeam)) {

                    // get possible moves of piece
                    opponent.possibleMoves = sBoard.getValidMoves(opponent, sBoard.pieces);

                    // Check if opponent is pawn
                    if (opponent.isPawn) {

                        // Checks if pawn has at least one possible move that has the opposite king in danger
                        if (opponent.possibleMoves.some(m => m.x !== opponent.position.x && m.equalsTo(cKing.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.equalsTo(move));
                        }
                    }
                    else {
                        // Checks if non-pawn opponent pieces has the playing king in its pathway
                        if (opponent.possibleMoves.some(m => m.equalsTo(cKing.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.equalsTo(move));
                        }
                    }
                }

            }

        }

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

    // Clone the chessboard
    clone(): Board {
        return new Board(this.pieces.map(p => p.clone()),
            this.totalTurns);
    }
}