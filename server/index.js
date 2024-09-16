// /server/index.js
import { connectToDatabase } from "./configs/db.config.js";
import userRouter from "./routes/user.js";
import vocabRouter from "./routes/vocab.js";
import ticketRouter from "./routes/ticket.js";
import cookieParser from "cookie-parser";

import express from "express";
import cors from "cors";

const app = express();
connectToDatabase();

app.use(cors());
app.disable("x-powererd-by");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/vocab", vocabRouter);
app.use("/api/ticket", ticketRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
