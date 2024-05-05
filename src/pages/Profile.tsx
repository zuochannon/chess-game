import React, { useEffect, useState } from "react";
import profileImage from "../assets/default_pfp.png"; // Importing the profile image
import { NavigationBar } from "../components/NavigationBar";
import { useWhoAmIContext } from "../context/WhoAmIContext";

export function Profile() {
  const [username, setUsername] = useState("Guest");
  const [email, setEmail] = useState("GuestEmail");
  const [gamesPlayed, setGamesPlayed] = useState([]);

  const { whoAmI } = useWhoAmIContext();

  useEffect(() => {
    setUsername(whoAmI.username);
    setEmail(whoAmI.email);

    fetch(`${import.meta.env.VITE_SERVER}/gamelog/summary`, {
      method: "GET",
      credentials: "include",
    })
    .then(response => response.json())
    .then(data => setGamesPlayed(data));
  }, []);


  return (
    <main className="h-screen bg-black">
      <NavigationBar />
      <div
        className="profile-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 className="bg-black text-3xl font-bold">User Profile</h1>
        </div>
        <div
          className="profile-info"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              marginRight: "20px",
            }}
          />
          <div>
            <h2>Username: {username}</h2>
            <h2>Email: {email}</h2>
            {/* <h2>Last Name: {user.lastName}</h2> */}
          </div>
        </div>
      </div>
      {gamesPlayed.map(el => <p>{JSON.stringify(el)}</p>)}
    </main>
  );
}
