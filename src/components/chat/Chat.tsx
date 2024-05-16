import { useWhoAmIContext } from "@/context/WhoAmIContext";
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useWebSocket } from "@/context/WebSocketContext";

function Chat({ styles }) {
  const { messages, sendMessage } = useWebSocket();
  const [messageInput, setMessageInput] = useState('');

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    sendMessage(messageInput);
    setMessageInput('');
  };

  return (
    <div
      className={clsx(
        "pb-4 flex flex-col",
        styles
      )}
    >
      <div className="overflow-auto max-h-screen h-full">
        <div className="mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="py-1 rounded mb-2 flex flex-row"
            >
              <div className="font-bold">{message.name ?? "Guest"}</div>:{" "}
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleMessageSubmit}>
        <div className="flex flex-row gap-5 w-full max-h-fit px-1">
          <input
            type="text"
            value={messageInput}
            onChange={handleMessageChange}
            className="border border-gray-300 p-2 rounded w-full mb-2"
            placeholder="Type your message..."
          />
          <Button type="submit" variant="outline">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
