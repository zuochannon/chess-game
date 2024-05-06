// server.mjs

import app from "./expressSetup.mjs";
import ENV from "./EnvVars.mjs";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { initDB } from "./database/initDB.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import whoamiRoutes from "./routes/whoami.mjs";
import gamelogRoutes from "./routes/gamelogRoutes.mjs";
import { verifyToken } from "./middlewares/authMiddleware.mjs";
import ioSetup from './sockets/io.mjs'; // Assuming you convert io.js to io.mjs as an ES module

if (!process.env.JWT_SECRET) {
  console.error('JWT secret is not defined. Set the JWT_SECRET environment variable.');
  process.exit(1);
}

initDB();

// Existing routes
app.use("/users/", verifyToken, userRoutes);
app.use("/auth", authRoutes);
app.use("/whoami", verifyToken, whoamiRoutes);
app.use("/gamelog", verifyToken, gamelogRoutes);

// Setup HTTP server and socket.io
const server = createServer(app);
const io = new SocketIOServer(server);

ioSetup(io);np

// Listen on the configured port
server.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
