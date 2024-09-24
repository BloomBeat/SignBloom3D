import express from "express";
import {
  userLogin,
  userRegister,
  userLogout,
} from "../controllers/userController.js";
import validateLogin from "../middlewares/validateLogin.js";
import validateRegister from "../middlewares/validateRegister.js";
import { authenticateUser } from "../middlewares/authUser.js";

const router = express.Router();
router.post("/login", validateLogin, userLogin);
router.post("/register", validateRegister, userRegister);
router.post("/logout", authenticateUser, userLogout);
export default router;
