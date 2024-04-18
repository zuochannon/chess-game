import { PieceType, ColorTeam } from "../enums/ChessEnums";
import { ChessPiece } from "../models/ChessPiece";
import { Position } from "../models/Position";

// Set column value and enables splitting into individual letter column
export const COLUMNS = "abcdefgh".split("");

// Set row value
export const ROWS = [1, 2, 3, 4, 5, 6, 7, 8];

export const FULL_SIZE = 600;

export const GRID_SIZE = FULL_SIZE / 8;

export interface Piece {
    chessPiece: ChessPiece;
    enPassant?: boolean;
}

export const initialBoard: Piece[] = [
    {
        chessPiece: new ChessPiece(new Position(0, 7), PieceType.ROOK, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(1, 7), PieceType.KNIGHT, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(2, 7), PieceType.BISHOP, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(3, 7), PieceType.KING, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(4, 7), PieceType.QUEEN, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(5, 7), PieceType.BISHOP, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(6, 7), PieceType.KNIGHT, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(7, 7), PieceType.ROOK, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(0, 0), PieceType.ROOK, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(1, 0), PieceType.KNIGHT, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(2, 0), PieceType.BISHOP, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(3, 0), PieceType.KING, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(4, 0), PieceType.QUEEN, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(5, 0), PieceType.BISHOP, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(6, 0), PieceType.KNIGHT, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(7, 0), PieceType.ROOK, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(0,6), PieceType.PAWN, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(1,6), PieceType.PAWN, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(2,6), PieceType.PAWN, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(3,6), PieceType.PAWN, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(4,6), PieceType.PAWN, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(5,6), PieceType.PAWN, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(6,6), PieceType.PAWN, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(7,6), PieceType.PAWN, ColorTeam.BLACK)
    },
    {
        chessPiece: new ChessPiece(new Position(0,1), PieceType.PAWN, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(1,1), PieceType.PAWN, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(2,1), PieceType.PAWN, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(3,1), PieceType.PAWN, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(4,1), PieceType.PAWN, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(5,1), PieceType.PAWN, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(6,1), PieceType.PAWN, ColorTeam.WHITE)
    },
    {
        chessPiece: new ChessPiece(new Position(7,1), PieceType.PAWN, ColorTeam.WHITE)
    },

];