import http from 'http';
import { Server as SocketServer } from 'socket.io';
import ENV from "./EnvVars.mjs";
import { initDB } from "./database/initDB.mjs";
import app from "./expressSetup.mjs";
import { verifyToken } from "./middlewares/authMiddleware.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import gamelogRoutes from "./routes/gamelogRoutes.mjs";
import onlinePlayRoutes from "./routes/onlinePlay.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import whoamiRoutes from "./routes/whoami.mjs";

if (!process.env.JWT_SECRET) {
  console.error('JWT secret is not defined. Set the JWT_SECRET environment variable.');
  process.exit(1);
}

try {
  await initDB();
}
catch (err) {
  console.error("Database initialization failed:", err);
}

app.use("/users", verifyToken, userRoutes);
app.use("/auth", authRoutes);
app.use("/whoami", verifyToken, whoamiRoutes);
app.use("/gamelog", verifyToken, gamelogRoutes);
app.use("/onlinePlay", onlinePlayRoutes);

const httpServer = http.createServer(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: process.env.VITE_ORIGIN,
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("moveMade", (roomId, move) => {
    io.in(roomId).emit("moveReceived", move);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
