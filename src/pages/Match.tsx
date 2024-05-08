import { Button } from "@/components/ui/button";
import React from "react";

function enqueue(): void {
  fetch(`${import.meta.env.VITE_SERVER}/match/queue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

function match(): void {
    fetch(`${import.meta.env.VITE_SERVER}/match/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

const Match = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div>Match</div>
      <Button onClick={enqueue} className="w-fit">Queue</Button>
      <Button onClick={match} className="w-fit">Random match</Button>
    </div>
  );
};

export default Match;
