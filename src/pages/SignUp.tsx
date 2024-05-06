import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSignUp = () => {
    // Checks for non-empty email, username, and password
    if (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    ) {
      fetch(`${import.meta.env.VITE_SERVER}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setIsRegistered(true);
        })
        .catch((error) => {
          console.error("There was a problem with the login request:", error);
        });
      // TODO: Redirect the user to another page after successful registration
    } else {
      alert("Please enter valid username, email, and password.");
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="mx-auto w-[350px]">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  required
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Enter password"

                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                disabled={!username}
                variant="yellow"
                className="w-full"
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/#/login" className="underline">
                Log in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
