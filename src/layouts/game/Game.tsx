import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
const Chess = require('chess.js');

interface Move {
  from: string;
  to: string;
  promotion?: string;
}

const Game = () => {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState('start');

  useEffect(() => {
    console.log("FEN updated:", fen);  // Log FEN updates to track changes
  }, [fen]);

  const handleMove = ({ from, to, promotion = 'q' }: Move) => {
    const move = { from, to, promotion };
    console.log("Attempting move:", move);
    const result = game.move(move);

    if (!result) {
      console.error("Illegal move", move);
      return;
    }

    setFen(game.fen());  // Update FEN from the current game state
  };

  console.log("Rendering Chessboard with FEN:", fen);  // Confirm that this log appears when expected
  return (
    <div className="game-container">
      <Chessboard
        width={400}
        position={fen}
        onDrop={({ sourceSquare, targetSquare }) => {
          handleMove({ from: sourceSquare, to: targetSquare });
        }}
      />
    </div>
  );
};

export default Game;
