import express from "express";
// import { User, connectToDatabase } from "./configs/db.config.js";
//import authenticateUser from "../middlewares/authUser.js";
import userLogin from "../controllers/userController.js";

const router = express.Router();
router.post("/login", userLogin);
//validateLogin, userLogin);
// router.get("/protected", authenticateUser, (req, res));

export default router;
