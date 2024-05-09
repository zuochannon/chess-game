import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWhoAmIContext } from "../context/WhoAmIContext";

export function CreateRoom() {
    let navigate = useNavigate();
    const [roomid, setRoomid] = useState(-1);
    const { whoAmI } = useWhoAmIContext();
    const [displayErrorMessage, setErrorMessage] = useState(false);

    async function handleButton() {
        if (!whoAmI) {
            // Checks if player is signed in to create a room
            setErrorMessage(true);
            return;
        }
        const response = await fetch(
            `${import.meta.env.VITE_SERVER}/onlinePlay/createRoom`,
            {
                method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ user: whoAmI }),
                    headers: {
                        "Content-Type": "application/json"
                    }
            }
        );
        console.log(response);
        setRoomid((await response.json())['roomid']);
    }

    if (roomid !== -1) {
        navigate('/onlinePlay/'+ roomid, {replace: true});
    }

    return (
        <main className='h-screen bg-black flex flex-col items-center' style={{ paddingTop: '100px' }}>
            <div className="flex justify-center">
                <h1 className='p-2 bg-black text-center w-screen text-3xl font-bold'>
                    <button className="p-2 bg-gray-800 text-white rounded-md"
                            onClick={handleButton}>CREATE ROOM</button>
                </h1>
            </div>
            {displayErrorMessage && (
                <div className="error-message text-white mt-4">
                    Please log in to create a game.
                </div>
            )}
        </main>
    );
}
