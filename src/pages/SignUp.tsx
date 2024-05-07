import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { getWhoAmI, postSignup } from "@/services/accessControl/AuthService";
import { useWhoAmIContext } from "@/context/WhoAmIContext";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { saveWhoAmI } = useWhoAmIContext();

  const handleSignUp = async () => {
    if (!(username.trim() && email.trim() && password.trim()))
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please enter valid username, email, and password.",
      });

    try {
      const signupResponse = await postSignup(username, email, password);

      if (!signupResponse.ok) throw new Error("Network response was not ok.");

      const data = await getWhoAmI();
      saveWhoAmI(data.user);
      navigate("/");
      return toast({
        title: "Successfully signed up.",
        description: "Redirecting to your profile.",
      });
    } catch (error) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
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
            <a href="/login" className="underline">
              Log in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
