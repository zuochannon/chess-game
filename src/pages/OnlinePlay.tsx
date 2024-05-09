import { ButtonOffset, NavigationBarHeight } from '@/data/constants/NavItems'
import { ColorTeam } from '@/data/enums/ChessEnums'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useWhoAmIContext } from "../context/WhoAmIContext"
import Game from '../layouts/game/Game'
import "../layouts/pages/Play.css"

export function OnlinePlay() {

    const [response, setResponse] = useState({status: -1, message: ''}) 
    const {roomid} = useParams()
    const { whoAmI } = useWhoAmIContext();

    useEffect(() =>{
        setResponse({status: -1, message: ''})
        fetch(
            `${import.meta.env.VITE_SERVER}/onlinePlay/createRoom`,
            {
                method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ user: whoAmI }),
                    headers: {
                        "Content-Type": "application/json"
                    }
            }
        ).then(async response => {console.log(response); 
                    setResponse({status: response.status, message: await response.text()})})
        },[roomid])

    const copyRoomIdToClipboard = () => {
        navigator.clipboard.writeText(roomid);
        alert("Room ID copied to clipboard!");
    };
        
    if (response.status == -1) {
        // Player waiting for opponent to join
        return (
            <main className = 'h-screen bg-black'>
            <h1 style={{color:'white', fontWeight:"bold", textAlign:'center', fontSize:"50px"}}>Loading...</h1>
            </main>
        )
    }
    else if (response.status != 200) {
        // Unauthorized access
        return (
            <main className = 'h-screen bg-black'>
            <h1 style={{color:'white', fontWeight:"bold", textAlign:'center', fontSize:"50px"}}>
                {response.message}</h1>
            </main>
        )
    } 
    else {
        return (
            // Display chess board
            <main className = 'h-auto bg-black'>
                <h1 style={{color:'white', fontWeight:"bold", textAlign:'center'}}>room: {roomid}</h1>
                <button className="block mx-auto my-5 bg-gray-800 text-white px-4 py-2 rounded-md" 
                onClick={copyRoomIdToClipboard}>Copy Room ID</button>
                <div id="play" className ='p-2 w-auto bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative'>
                    <Game offset = {NavigationBarHeight + ButtonOffset + 80} boardOrientation={ColorTeam.WHITE}/>
                </div>
            </main>
        )
    }
}