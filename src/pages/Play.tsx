// Import necessary modules from react and socket.io-client
import React from 'react';
import Game from "../layouts/game/Game";

const Play = () => {
  return (
    <main className='h-screen bg-black'>
      <div id="play" className='p-2 w-auto bg-gradient-to-t from-blue-700 via-blue-850 to-black relative'>
        <Game />
      </div>
    </main>
  );
};

export default Play;