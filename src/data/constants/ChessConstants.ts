import { PieceType, ColorTeam } from "../enums/ChessEnums";
import { Board } from "../models/Board";
import { ChessPiece, Pawn } from "../models/ChessPiece";
import { Position } from "../models/Position";

// Set column value and enables splitting into individual letter column
export const COLUMNS = "abcdefgh".split("");

// Set row value
export const ROWS = [1, 2, 3, 4, 5, 6, 7, 8];

export const FULL_SIZE = 600;

export const GRID_SIZE = FULL_SIZE / 8;

// Set initial board positions
export const initialBoard: Board = new Board([
    new ChessPiece(new Position(0, 7), PieceType.ROOK, ColorTeam.BLACK, false),
    new ChessPiece(new Position(1, 7), PieceType.KNIGHT, ColorTeam.BLACK, false),
    new ChessPiece(new Position(2, 7), PieceType.BISHOP, ColorTeam.BLACK, false),
    new ChessPiece(new Position(3, 7), PieceType.QUEEN, ColorTeam.BLACK, false),
    new ChessPiece(new Position(4, 7), PieceType.KING, ColorTeam.BLACK, false),
    new ChessPiece(new Position(5, 7), PieceType.BISHOP, ColorTeam.BLACK, false),
    new ChessPiece(new Position(6, 7), PieceType.KNIGHT, ColorTeam.BLACK, false),
    new ChessPiece(new Position(7, 7), PieceType.ROOK, ColorTeam.BLACK, false),
    new ChessPiece(new Position(0, 0), PieceType.ROOK, ColorTeam.WHITE, false),
    new ChessPiece(new Position(1, 0), PieceType.KNIGHT, ColorTeam.WHITE, false),
    new ChessPiece(new Position(2, 0), PieceType.BISHOP, ColorTeam.WHITE, false),
    new ChessPiece(new Position(4, 0), PieceType.KING, ColorTeam.WHITE, false),
    new ChessPiece(new Position(3, 0), PieceType.QUEEN, ColorTeam.WHITE, false),
    new ChessPiece(new Position(5, 0), PieceType.BISHOP, ColorTeam.WHITE, false),
    new ChessPiece(new Position(6, 0), PieceType.KNIGHT, ColorTeam.WHITE, false),
    new ChessPiece(new Position(7, 0), PieceType.ROOK, ColorTeam.WHITE, false), 
    new Pawn(new Position(0,6), ColorTeam.BLACK, false),
    new Pawn(new Position(1,6), ColorTeam.BLACK, false),
    new Pawn(new Position(2,6), ColorTeam.BLACK, false),
    new Pawn(new Position(3,6), ColorTeam.BLACK, false),
    new Pawn(new Position(4,6), ColorTeam.BLACK, false),
    new Pawn(new Position(5,6), ColorTeam.BLACK, false),
    new Pawn(new Position(6,6), ColorTeam.BLACK, false),
    new Pawn(new Position(7,6), ColorTeam.BLACK, false),
    new Pawn(new Position(0,1), ColorTeam.WHITE, false),
    new Pawn(new Position(1,1), ColorTeam.WHITE, false),
    new Pawn(new Position(2,1), ColorTeam.WHITE, false),
    new Pawn(new Position(3,1), ColorTeam.WHITE, false),
    new Pawn(new Position(4,1), ColorTeam.WHITE, false),
    new Pawn(new Position(5,1), ColorTeam.WHITE, false),
    new Pawn(new Position(6,1), ColorTeam.WHITE, false),
    new Pawn(new Position(7,1), ColorTeam.WHITE, false),
], 1);

initialBoard.processAllPossibleMoves();