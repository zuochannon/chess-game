import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import Game from '../layouts/game/Game';
import "../layouts/pages/Play.css";
import { NavigationBarHeight, ButtonOffset } from '@/data/constants/NavItems';
import { ColorTeam } from '@/data/enums/ChessEnums';

export function OnlinePlay() {
    const { roomid } = useParams<{ roomid: string }>();
    const socket = useSocket(import.meta.env.VITE_SERVER_URL);

    const [response, setResponse] = useState({status: -1, message: ''});

    useEffect(() => {
        if (socket) {
            socket.connect();
            socket.emit('joinRoom', roomid);

            socket.on('moveReceived', (move) => {
                console.log('Move received:', move);
                // Update your game state here based on the received move
            });

            return () => {
                socket.off('moveReceived');
            };
        }
    }, [socket, roomid]);

    const handleMove = (move: any) => {
        if (socket) {
            socket.emit('moveMade', roomid, move);
        }
    };

    const copyRoomIdToClipboard = () => {
        navigator.clipboard.writeText(roomid);
        alert("Room ID copied to clipboard!");
    };

    if (response.status === -1) {
        // Player waiting for opponent to join
        return (
            <main className='h-screen bg-black'>
                <h1 style={{ color: 'white', fontWeight: "bold", textAlign: 'center', fontSize: "50px" }}>Loading...</h1>
            </main>
        );
    } else if (response.status !== 200) {
        // Unauthorized access
        return (
            <main className='h-screen bg-black'>
                <h1 style={{ color: 'white', fontWeight: "bold", textAlign: 'center', fontSize: "50px" }}>
                    {response.message}
                </h1>
            </main>
        );
    } else {
        return (
            <main className='h-screen bg-black'>
                <h1 style={{ color: 'white', fontWeight: "bold", textAlign: 'center' }}>Room: {roomid}</h1>
                <button className="block mx-auto my-5 bg-gray-800 text-white px-4 py-2 rounded-md" onClick={copyRoomIdToClipboard}>Copy Room ID</button>
                <div id="play" className='p-2 w-auto bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative'>
                    <Game offset={NavigationBarHeight + ButtonOffset} boardOrientation={ColorTeam.WHITE} onMove={handleMove} />
                </div>
            </main>
        );
    }
}

export default OnlinePlay;
