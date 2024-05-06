import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { useWhoAmIContext } from "../context/WhoAmIContext";
import { Button } from "../components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import landscape from "/landscape.png";
import chessLogo from "/chess.svg";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { saveWhoAmI } = useWhoAmIContext();

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
    <>
      <div>
        {isLoggedIn ? (
          <div>
            <h2>Welcome, {username}!</h2>
            {/* Display logout button or redirect to another page */}
          </div>
        ) : (
          <>
            <div className="min-h-screen grid lg:grid-cols-2">
              <div className="flex items-center justify-center py-12 bg-gradient-to-br from-blue-100  to-blue-50">
                <div className="mx-auto grid w-[350px] gap-6">
                  <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      onClick={handleLogin}
                    >
                      Log in
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="/#/signup" className="underline">
                      Sign up
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden bg-muted lg:block">
                <div className="relative h-full">
                  <img
                    src={landscape}
                    alt="Image"
                    width="1600px"
                    height="1200px"
                    className="h-full w-full object-cover"
                  />
                  <img
                    src={chessLogo}
                    alt="Image"
                    width="50%"
                    height="50%"
                    className="absolute top-0 left-0 right-0 object-cover bottom-0 mx-auto my-auto filter drop-shadow-2xl animate-wiggle"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
