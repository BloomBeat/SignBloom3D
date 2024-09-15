import express from "express";
import {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";
import { authenticateUser } from "../middlewares/authUser.js";
const router = express.Router();

router.get("/", authenticateUser, getTicket); // get all tickets from the db
router.post("/create", createTicket); // add a ticket to the db
router.patch("/update", updateTicket); // change some details(fields) in individual document in db
router.delete("/delete", deleteTicket); // delete a ticket from the db

export default router;
