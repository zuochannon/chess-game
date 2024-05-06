import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavigationBar } from '../components/NavigationBar'
import Game from '../layouts/game/Game'
import "../layouts/pages/Play.css"
export function OnlinePlay() {

    const [response, setResponse] = useState({status: -1, message: ''}) 
    const {roomid} = useParams()

    useEffect(() =>{
        setResponse({status: -1, message: ''})
        fetch(
            `${import.meta.env.VITE_SERVER}/onlinePlay/${roomid}/joinRoom`,
                {
                method: "GET",
                credentials: "include",
                }
            ).then(async response => {console.log(response); 
                    setResponse({status: response.status, message: await response.text()})})
        },[roomid])
        
    if (response.status == -1) {
        // Player waiting for opponent to join
        return (
            <main className = 'h-screen bg-black'>
            <NavigationBar />
            <h1 style={{color:'white', fontWeight:"bold", textAlign:'center', fontSize:"50px"}}>Loading...</h1>
            </main>
        )
    }
    else if (response.status != 200) {
        // Unauthorized access
        return (
            <main className = 'h-screen bg-black'>
            <NavigationBar />
            <h1 style={{color:'white', fontWeight:"bold", textAlign:'center', fontSize:"50px"}}>
                {response.message}</h1>
            </main>
        )
    } 
    else {
        return (
            // Display chess board
            <main className = 'h-screen bg-black'>
                <NavigationBar />
                <h1 style={{color:'white', fontWeight:"bold", textAlign:'center'}}>room: {roomid}</h1>
                <div id="play" className ='p-2 w-auto bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative'>
                    <Game />
                </div>
            </main>
        )
    }
}