import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import constants from "./constants.mjs";

const startWebSocketServer = (app) => {
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("A client connected");

    ws.on("message", (message) => {
      console.log("Received: ", message.toString());
      // Broadcast message to all clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
  server.listen(constants.CHAT_PORT, () => {
    console.log(`Chat Server running on port ${constants.CHAT_PORT}`);
  });
};

export default startWebSocketServer;