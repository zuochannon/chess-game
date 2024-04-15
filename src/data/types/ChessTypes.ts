
// Sets chess board
export type Square =
  | "a8" | "b8" | "c8" | "d8" | "e8" | "f8" | "g8" | "h8"
  | "a7" | "b7" | "c7" | "d7" | "e7" | "f7" | "g7" | "h7"
  | "a6" | "b6" | "c6" | "d6" | "e6" | "f6" | "g6" | "h6"
  | "a5" | "b5" | "c5" | "d5" | "e5" | "f5" | "g5" | "h5"
  | "a4" | "b4" | "c4" | "d4" | "e4" | "f4" | "g4" | "h4"
  | "a3" | "b3" | "c3" | "d3" | "e3" | "f3" | "g3" | "h3"
  | "a2" | "b2" | "c2" | "d2" | "e2" | "f2" | "g2" | "h2"
  | "a1" | "b1" | "c1" | "d1" | "e1" | "f1" | "g1" | "h1";

// Sets chess piece type
export type Piece = 
  | "bP" | "bN" | "bB" | "bR" | "bQ" | "bK"
  | "wP" | "wN" | "wB" | "wR" | "wQ" | "wK";

// Maps each square on the chess board to a piece
// Basically, specifies if there is a piece on the square
export type BoardPosition = { [square in Square] ?: Piece };

// Set orientation of board
export type BoardOrientation = "white" | "black";

// Get coordinates in board
export type BoardCoordinates = { x: number; y: number };

// Chess Props
export type ChessProps = {

  /*
   * Checks if pieces are draggable
   */
  arePiecesDraggable ?: boolean;

  /*
   * Set orientation of board.
   */
  boardOrientation ?: BoardOrientation;

  /*
   * Checks if selected piece is draggable
   */
  isPieceDraggable ?: boolean;

  /*
   * Function when a square is clicked
   */
  onSquareClick ?: (square: Square, piece: Piece | undefined) => any;

  /*
   * Function when a promotion piece is selected [PLACEHOLDER]
   */
  promotePieceSelect ?: () => boolean;
}