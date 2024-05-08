import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import Game from '../layouts/game/Game';
import "../layouts/pages/Play.css";
import { NavigationBarHeight } from '@/data/constants/NavItems';
import { ColorTeam } from '@/data/enums/ChessEnums';

export function OnlinePlay() {
    const navigate = useNavigate();
    const { roomid } = useParams<{ roomid: string }>();
    const socket = useSocket(import.meta.env.VITE_SERVER);
    const [response, setResponse] = useState({ status: -1, message: 'Loading...' });
    const [gameInfo, setGameInfo] = useState<any>({ moves: [] });

    useEffect(() => {
        const joinRoom = async () => {
            console.log("Attempting to join room:", roomid);
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER}/onlinePlay/${roomid}/joinRoom`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                if (response.ok) {
                    console.log("Joined room successfully:", data);
                    setGameInfo(data.gameInfo); // Assume gameInfo includes initial game state and moves
                    setResponse({ status: 200, message: 'Room joined' });
                } else {
                    console.log("Failed to join room:", data);
                    setResponse({ status: response.status, message: data.message || 'Failed to join room' });
                }
            } catch (error) {
                console.error("Error joining room:", error);
                setResponse({ status: 500, message: 'Network error or server is unreachable' });
            }
        };

        joinRoom();

        if (socket) {
            socket.connect();
            socket.emit('joinRoom', roomid);

            socket.on('moveReceived', (move) => {
                console.log('Move received:', move);
                setGameInfo(prev => ({
                    ...prev,
                    moves: [...prev.moves, move]
                }));
            });

            socket.on('gameStarted', () => {
                console.log("Game started event received");
            });

            return () => {
                socket.off('moveReceived');
                socket.off('gameStarted');
                socket.disconnect();
            };
        }
    }, [socket, roomid, navigate]);

    if (response.status === -1) {
        return (
            <main className='h-screen bg-black'>
                <h1 style={{ color: 'white', fontWeight: "bold", textAlign: 'center', fontSize: "50px" }}>{response.message}</h1>
            </main>
        );
    } else if (response.status !== 200) {
        return (
            <main className='h-screen bg-black'>
                <h1 style={{ color: 'white', fontWeight: "bold", textAlign: 'center', fontSize: "50px" }}>{response.message}</h1>
            </main>
        );
    } else {
        return (
            <main className='h-screen bg-black'>
                <h1 style={{ color: 'white', fontWeight: "bold", textAlign: 'center' }}>Room: {roomid}</h1>
                <div id="play" className='p-2 w-auto bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative'>
                    <Game offset={NavigationBarHeight} boardOrientation={ColorTeam.WHITE} initialMoves={gameInfo.moves} />
                </div>
            </main>
        );
    }
}

export default OnlinePlay;
