import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import React, { useEffect, useState } from 'react'



const UserLeaderboard = () => {
    const [players, setPlayers] = useState([]);

    const fetchUsers = async () => {
        try {
          fetch(`${import.meta.env.VITE_SERVER}/leaderboard/getAll`)
            .then((response) => response.json())
            .then((data) => {
                data.users.sort((a, b) => b.elo - a.elo);
                setPlayers(data.users);
            });
        } catch (error) {
          console.error("Error fetching players:", error);
        }
      };

      useEffect(() => {
        fetchUsers();
    
        const interval = setInterval(fetchUsers, 10000);
        return () => clearInterval(interval);
      }, []);

  return (
    <div className='p-4 w-full h-screen'>
        <h2 className='text-center'>Leaderboard</h2>
        <Leaderboard data={players}/>
    </div>
  )
}

export default UserLeaderboard