import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import useWhoAmI from "../hooks/useWhoAmI";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { saveWhoAmI } = useWhoAmI();

  const handleLogin = async () => {
    // Check if user and password are not empty
    if (username.trim() !== "" && password.trim() !== "") {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include",
        }
      );

      if (response.ok) {
        await fetch(`${import.meta.env.VITE_SERVER}/whoami`, {
          method: "GET",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            saveWhoAmI(data.user);
          });
          
        setIsLoggedIn(true);
      }

      //   .catch(error => {
      //     console.error('There was a problem with the login request:', error);
      //   });
      //   // TODO: Successful login page
    } else {
      alert("Please enter valid username and password.");
    }
  };
  return (
    <main className="h-screen bg-black">
      <NavigationBar />
      <h1 className="bg-[#0f0f0f0f] text-center w-full text-3xl font-bold">
        Login
      </h1>
      <div>
        {isLoggedIn ? (
          <div>
            <h2>Welcome, {username}!</h2>
            {/* Display logout button or redirect to another page */}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ margin: "10px auto", width: "50vw", padding: "10px" }}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ margin: "10px auto", width: "50vw", padding: "10px" }}
            />
            <br />
            <button
              onClick={handleLogin}
              style={{ margin: "10px auto", width: "50vw", padding: "10px" }}
            >
              Login
            </button>
            <p style={{ margin: "10px auto", width: "50vw", padding: "10px" }}>
              Don't have an account? <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
