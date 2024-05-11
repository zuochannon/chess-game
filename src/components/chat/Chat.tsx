import { useState, useEffect, useRef } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const socket = useRef<WebSocket | null>();

  useEffect(() => {
    socket.current = new WebSocket(import.meta.env.VITE_CHAT_URL);

    socket.current.addEventListener('open', (_event) => {
      console.log('\x1b[32mconnection opened\x1b[0m');
    });

    socket.current.addEventListener('message', (event) => {
      console.log('\x1b[34mmessage received:\x1b[0m', event.data);
      const newMessage = event.data.toString();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.current.addEventListener('close', (event) => {
      console.log('\x1b[31mconnection closed\x1b[0m');
    });

    return () => {
      socket.current?.close();
    };
  }, []);

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (socket.current && socket.current.readyState === WebSocket.OPEN && messageInput.trim() !== "") {
      socket.current.send(JSON.stringify({ text: messageInput }));
      setMessageInput("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Chat</h1>
      <div className="mb-4">
        {messages.map((message, index) => (
          <div key={index} className="bg-gray-200 p-2 rounded mb-2">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={messageInput}
          onChange={handleMessageChange}
          className="border border-gray-300 p-2 rounded w-full mb-2"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
