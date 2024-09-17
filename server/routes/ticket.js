import express from "express";
import {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";
import {
  authenticateUser,
  authenticateAdmin,
} from "../middlewares/authUser.js";
const router = express.Router();

router.get("/", authenticateUser, getTicket); // get all tickets from the db
router.post("/create", authenticateUser, createTicket); // add a ticket to the db
router.patch("/update", authenticateUser, updateTicket); // change some details(fields) in individual document in db
router.delete("/delete", authenticateAdmin, deleteTicket); // delete a ticket from the db

export default router;
