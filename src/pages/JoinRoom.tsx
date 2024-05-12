import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWhoAmIContext } from "../context/WhoAmIContext";

export function JoinRoom() { 
    let navigate = useNavigate();
    const [roomid, setRoomId] = useState('');
    const { whoAmI } = useWhoAmIContext();
    const [displayErrorMessage, setErrorMessage] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!whoAmI) {
            // Checks if player is signed in to create a room
            setErrorMessage(true);
            return;
        }

        // Delaying navigation by 1 second
        setTimeout(() => {
            navigate(`/onlinePlay/${roomid}`);
        }, 1000);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(event.target.value);
    };

    return (
        <main className='h-screen bg-black flex flex-col items-center' style={{ paddingTop: '100px' }}>
            <h1 className='p-2 bg-black text-center w-screen text-3xl font-bold'>
                JOIN ROOM
            </h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={roomid}
                        onChange={handleChange}
                        placeholder="Enter Room ID"
                        className="block mx-auto my-4 p-2 border border-gray-500 rounded-md"
                    />
                    <button type="submit" className="block mx-auto p-2 bg-gray-800 text-white rounded-md">
                        Join Room
                    </button>
                    {displayErrorMessage && (
                        <div className="error-message text-white mt-4">
                            Please log in to create a game.
                        </div>
                    )}
                </form>
            </div>
        </main>
    )
}
