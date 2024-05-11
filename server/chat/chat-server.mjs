import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import constants from "./constants.mjs";

const startWebSocketServer = (app) => {
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      // Broadcast message to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
    });
  });
  server.listen(constants.CHAT_PORT, () => {
    console.log(`Chat Server running on port ${constants.CHAT_PORT}`);
  });
};

export default startWebSocketServer;
