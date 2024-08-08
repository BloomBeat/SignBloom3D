import express from "express";
import { userLogin, userRegister } from "../controllers/userController.js";
import validateLogin from "../middlewares/validateLogin.js";
import validateRegister from "../middlewares/validateRegister.js";

const router = express.Router();

router.post("/login", validateLogin, userLogin); // /api/users/login
router.post("/register", validateRegister, userRegister); // /api/users/register

export default router;
