import React, { useEffect, useState } from "react";
import { useWhoAmIContext } from "../context/WhoAmIContext";
import { getGameHistorySummary } from "@/services/UserService";
import UserAvatar from "@/components/avatar/UserAvatar";
import { GameHistorySummary } from "@/components/gameHistory/GameHistorySummary";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState({});

  const { whoAmI } = useWhoAmIContext();

  const getGamesPlayed = () => {
    return Object.values(gamesPlayed).reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);
  };

  useEffect(() => {
    setUsername(whoAmI?.username ?? "Guest");
    setEmail(whoAmI?.email ?? "GuestEmail");

    getGameHistorySummary().then((data) => setGamesPlayed(data ?? []));
  }, [whoAmI?.email, whoAmI?.username]);

  return (
    <main className="h-screen ">
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
          <h1 className="text-3xl font-bold">User Profile</h1>
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
          <div className="h-24 w-24 mx-8">
            <UserAvatar />
          </div>
          <div>
            <h3>Username: {username}</h3>
            <h3>Email: {email}</h3>
            {/* <h2>Last Name: {user.lastName}</h2> */}
          </div>
        </div>
      </div>
      <div className="p-4">
        <GameHistorySummary data={getGamesPlayed()} />
      </div>
    </main>
  );
};

export default Profile;
