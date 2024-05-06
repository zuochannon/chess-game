import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export function CreateRoom() {
    let navigate = useNavigate()
    const [roomid, setRoomid] = useState(-1)
    async function handleButton() {
        console.log("Clicked")
        const response = await fetch(
            `${import.meta.env.VITE_SERVER}/onlinePlay/createRoom`,
            {
              method: "GET",
              credentials: "include",
            }
          );
        console.log(response)
        setRoomid((await response.json())['roomid']);
    }
    if (roomid != -1) {
        navigate('/onlinePlay/'+ roomid, {replace: true});
    }
    return (
        <main className = 'h-screen bg-black'>
            <h1 className = 'p-2 bg-black text-center w-screen text-3xl font-bold'>
                <button className="block mx-auto p-2 bg-gray-800 text-white rounded-md"
                 onClick={handleButton}>CREATE ROOM</button>
            </h1>
        </main>
    )
}