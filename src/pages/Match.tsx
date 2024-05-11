import Chat from "@/components/chat/Chat";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

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
  const [queueLength, setQueueLength] = useState(0);
  const [inQueue, setInQueue] = useState(false);

  const fetchQueueLength = async () => {
    try {
      fetch(`${import.meta.env.VITE_SERVER}/match/queue_length`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => setQueueLength(data.len));
    } catch (error) {
      console.error("Error fetching queue length:", error);
    }
  };

  useEffect(() => {
    fetchQueueLength();

    const interval = setInterval(fetchQueueLength, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4">
      <div>Match</div>
      <Button
        disabled={inQueue}
        onClick={() => {
          setInQueue(true);
          enqueue();
          setQueueLength(queueLength + 1);
        }}
        className="w-fit"
      >
        Queue
      </Button>
      <Button onClick={match} className="w-fit">
        Random match
      </Button>
      <div>Users in queue: {queueLength}</div>
      <Chat />
    </div>
  );
};

export default Match;
