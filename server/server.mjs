import app from "./expressSetup.mjs";
import ENV from "./EnvVars.mjs";
import { initDB } from "./database/initDB.mjs";
import userRoutes from "./routes/userRoutes.mjs"
import authRoutes from "./routes/authRoutes.mjs"
import { verifyToken } from "./middlewares/authMiddleware.mjs";
import whoamiRoutes from "./routes/whoami.mjs";
import gamelogRoutes from "./routes/gamelogRoutes.mjs";

if (!process.env.JWT_SECRET) {
  console.error('JWT secret is not defined. Set the JWT_SECRET environment variable.');
  process.exit(1);
}

initDB();

app.use("/users/", verifyToken, userRoutes);
app.use("/auth", authRoutes);
app.use("/whoami", verifyToken, whoamiRoutes);
app.use("/gamelog", verifyToken, gamelogRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});