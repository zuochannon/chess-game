import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import Game from '../layouts/game/Game';
import "../layouts/pages/Play.css";
import { NavigationBarHeight, ButtonOffset } from '@/data/constants/NavItems';
import { ColorTeam } from '@/data/enums/ChessEnums';

export function OnlinePlay() {
    const navigate = useNavigate();
    const { roomid } = useParams<{ roomid: string }>();
    const socket = useSocket(import.meta.env.VITE_SERVER);
    const [response, setResponse] = useState({ status: -1, message: 'Loading...' });

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
            });

            socket.on('gameStarted', () => {
                console.log("Game started event received");
                setResponse({ status: 200, message: 'Game started' });
            });

            return () => {
                socket.off('moveReceived');
                socket.off('gameStarted');
            };
        }
    }, [socket, roomid, navigate]);

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
                <button className="block mx-auto my-5 bg-gray-800 text-white px-4 py-2 rounded-md" onClick={copyRoomIdToClipboard}>Copy Room ID</button>
                <div id="play" className='p-2 w-auto bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative'>
                    <Game offset={NavigationBarHeight + ButtonOffset} boardOrientation={ColorTeam.WHITE} onMove={handleMove} />
                </div>
            </main>
        );
    }
}

export default OnlinePlay;
