import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';

export function JoinRoom() { 
    let navigate = useNavigate();
    const [roomid, setRoomId] = useState('');
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/onlinePlay/${roomid}`);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(event.target.value);
    };

    return (
        <main className='h-screen bg-black'>
            <NavigationBar />
            <h1 className='p-2 bg-black text-center w-screen text-3xl font-bold'>
                JOIN ROOM
            </h1>
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
            </form>
        </main>
    )
}
//     return (
//         <main className = 'h-screen bg-black'>
//             <NavigationBar />
//             <h1 className = 'p-2 bg-black text-center w-screen text-3xl font-bold'>
//                 JOIN ROOM
//             </h1>
//             <p>
//                 PLACEHOLDER
//             </p>
//         </main>
//     )
// }