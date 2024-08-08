import express from "express";
// import { User, connectToDatabase } from "./configs/db.config.js";
//import authenticateUser from "../middlewares/authUser.js";
import { userLogin } from "../controllers/userController.js";
import validateLogin from "../middlewares/validateLogin.js";

const router = express.Router();

router.post("/", validateLogin, userLogin); // /api/users/login

// router.get("/protected", authenticateUser, (req, res));

export default router;
