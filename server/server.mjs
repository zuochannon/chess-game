import app from "./expressSetup.mjs";
import ENV from "./EnvVars.mjs";
import { initDB } from "./database/initDB.mjs";
import userRoutes from "./routes/userRoutes.mjs"

if (!process.env.JWT_SECRET) {
  console.error('JWT secret is not defined. Set the JWT_SECRET environment variable.');
  process.exit(1);
}

initDB();

app.use("/users/", userRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});