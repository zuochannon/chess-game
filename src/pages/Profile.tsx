import React, { useEffect, useState } from "react";
import { useWhoAmIContext } from "../context/WhoAmIContext";
import { getGameHistorySummary } from "@/services/UserService";
import UserAvatar from "@/components/avatar/UserAvatar";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState({});

  const { whoAmI } = useWhoAmIContext();

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
          <div className="h-24 w-24 mx-4">

          <UserAvatar />
          </div>
          <div>
            <h2>Username: {username}</h2>
            <h2>Email: {email}</h2>
            {/* <h2>Last Name: {user.lastName}</h2> */}
          </div>
        </div>
      </div>
      {Object.values(gamesPlayed).map((el) => (
        <p>{JSON.stringify(el)}</p>
      ))}
    </main>
  );
}

export default Profile;