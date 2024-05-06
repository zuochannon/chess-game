import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from "chess.js"

import { Socket } from 'socket.io-client';


interface GameProps {
 socket: Socket;
}


const Game: React.FC<GameProps> = ({ socket }) => {
 const [game, setGame] = useState(new Chess());
 const [fen, setFen] = useState('start');


 useEffect(() => {
   console.log('Component mounted or updated');
   const moveHandler = (move: { from: string, to: string, promotion?: string }) => {
     console.log('Move received:', move);
     const newGame = new Chess(fen);  // Create a new game instance based on current FEN
     newGame.move(move);
     setGame(newGame);
     setFen(newGame.fen());
   };


   socket?.on('move', moveHandler);


   return () => {
     socket?.off('move', moveHandler);
   };
 }, [socket, fen]);  // Use fen instead of game to reduce dependency complexity


 const handleMove = (move: { from: string, to: string, promotion?: string }) => {
   console.log('Handling move:', move);
   let newGame = new Chess(fen);  // Again, create a new instance using fen
   const result = newGame.move(move);


   if (result === null) return; // Illegal move


   setGame(newGame);
   setFen(newGame.fen());
   socket.emit('move', move);
 };


 return (
   <div className="game-container">
     <Chessboard
       width={400}
       position={fen}
       onDrop={({ sourceSquare, targetSquare }) =>
         handleMove({ from: sourceSquare, to: targetSquare, promotion: 'q' })
       }
     />
   </div>
 );
};


export default Game;
