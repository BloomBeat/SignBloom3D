import express from "express";
import { connectToDatabase } from "./configs/db.config.js";

const app = express();

// Connect to the database
connectToDatabase();

// Middleware, routes, etc.

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
