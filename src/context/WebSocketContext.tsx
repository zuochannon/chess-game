// WebSocketContext.js
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useWhoAmIContext } from "./WhoAmIContext";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const socket = useRef<WebSocket | null>();
  const [messages, setMessages] = useState([]);
  const { whoAmI } = useWhoAmIContext();

  useEffect(() => {
    socket.current = new WebSocket(import.meta.env.VITE_CHAT_URL);

    socket.current.addEventListener("open", (_event) => {
      console.log("\x1b[32mconnection opened\x1b[0m");
    });

    socket.current.addEventListener("message", (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.current.addEventListener("close", (event) => {
      console.log("\x1b[31mconnection closed\x1b[0m");
    });

    return () => {
      socket.current?.close();
    };
  }, []);

  const sendMessage = (messageInput) => {
    if (
      socket.current &&
      socket.current.readyState === WebSocket.OPEN &&
      messageInput.trim() !== ""
    ) {
      socket.current.send(
        JSON.stringify({ name: whoAmI?.username, text: messageInput })
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { name: "You", text: messageInput },
      ]);
    }
  };

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
