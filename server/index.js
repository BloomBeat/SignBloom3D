// /server/index.js
import express from "express";
import { connectToDatabase } from "./configs/db.config.js";
import vocabRouter from "./routes/vocab.js"; // Updated import
import ticketRouter from "./routes/ticket.js"; // Updated import
const app = express();

// Connect to the database
connectToDatabase();

// Middleware, routes, etc.
app.use(express.json());
app.use("/api", vocabRouter);
app.use("/ticket", ticketRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
