import app from "./expressSetup.mjs";
import ENV from "./EnvVars.mjs";
import { initDB } from "./database/initDB.mjs";
import userRoutes from "./routes/userRoutes.mjs"

initDB();

app.use("/users/", userRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});