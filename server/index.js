// /server/index.js
import { connectToDatabase } from "./configs/db.config.js";
import userRouter from "./routes/user.js";
import vocabRouter from "./routes/vocab.js";
import ticketRouter from "./routes/ticket.js";
import animationRouter from "./routes/animation.js"; 
import cookieParser from "cookie-parser";


import express from "express";
import cors from "cors";

const app = express();
connectToDatabase();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.disable("x-powererd-by");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/vocab", vocabRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/animation", animationRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
