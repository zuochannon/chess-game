import React, { useEffect, useState } from 'react'

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);

    const fetchUsers = async () => {
        try {
          fetch(`${import.meta.env.VITE_SERVER}/leaderboard/getAll`)
            .then((response) => response.json())
            .then((data) => setPlayers(data.users));
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
    <div>
        Leaderboard
        {JSON.stringify(players)}


    </div>
  )
}

export default Leaderboard