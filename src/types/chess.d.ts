// src/types/chess.d.ts
declare module 'chess.js' {
    interface ChessInstance {
      fen(): string;
      game_over(): boolean;
      in_check(): boolean;
      in_checkmate(): boolean;
      in_draw(): boolean;
      move(move: string | Move): Move | null;
      pgn(): string;
      load(fen: string): boolean;
      reset(): void;
      turn(): 'b' | 'w';
    }
  
    interface Move {
      color?: 'w' | 'b';
      from: string;
      to: string;
      promotion?: string;
      flags?: string;
      piece?: string;
      san?: string;
      captured?: string;
    }
  
    export = Chess;
  
    function Chess(fen?: string): ChessInstance;
  }
  