import ENV from "./EnvVars.mjs";
import { initDB } from "./database/initDB.mjs";
import app from "./expressSetup.mjs";
import { verifyToken } from "./middlewares/authMiddleware.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import gamelogRoutes from "./routes/gamelogRoutes.mjs";
import onlinePlayRoutes from "./routes/onlinePlay.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import whoamiRoutes from "./routes/whoami.mjs";
import matchRoutes from "./routes/match.mjs";
import leaderboardRoutes from "./routes/leaderboardRoutes.mjs";
import replayRoutes from "./routes/gameReplay.mjs";
import annotateRoutes from "./routes/gameAnnotation.mjs";
import startWebSocketServer from "./chat/chat-server.mjs";

if (!ENV.JWT_SECRET) {
  console.error('JWT secret is not defined. Set the JWT_SECRET environment variable.');
  process.exit(1);
}

try {
  await initDB(); 
}
catch (err) {
  console.log("DB not there")
  console.log(err);
}

startWebSocketServer(app);

app.use("/users/", verifyToken, userRoutes);
app.use("/auth", authRoutes);
app.use("/whoami", verifyToken, whoamiRoutes);
app.use("/gamelog", verifyToken, gamelogRoutes);
app.use("/onlinePlay", onlinePlayRoutes);
app.use("/match", matchRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/replay", replayRoutes);
app.use("/annotate", verifyToken, annotateRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
