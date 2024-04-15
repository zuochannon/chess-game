import { createContext, forwardRef, ReactNode, useContext, useEffect, useImperativeHandle, useRef, useState,} from 'react';
import { BoardPosition, Piece, Square, ChessProps } from '../data/types/ChessTypes';

type RequiredChessProps = Required<ChessProps>;

// Chess Context Interface
interface ChessContext {
    arePiecesDraggable: RequiredChessProps["arePiecesDraggable"];
    boardOrientation: RequiredChessProps["boardOrientation"];
    isPieceDraggable: RequiredChessProps["isPieceDraggable"];
    onSquareClick: RequiredChessProps["onSquareClick"];
    promotePieceSelect: RequiredChessProps["promotePieceSelect"];
}

// Export context of chessboard
export const ChessboardContext = createContext({} as ChessContext);


