// /server/index.js
import express from "express";
import { connectToDatabase } from "./configs/db.config.js";
import router from "./routes/vocab.js"; // Updated import
import userRouter from "./routes/user.js"; // Updated import
const app = express();

// Connect to the database
connectToDatabase();

// Middleware, routes, etc.
app.use(express.json());
app.use("/api", router);
app.use("/api/users", userRouter); // api/users/
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
