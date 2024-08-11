import express from "express";
import { userLogin, userRegister } from "../controllers/userController.js";
import validateLogin from "../middlewares/validateLogin.js";
import validateRegister from "../middlewares/validateRegister.js";

const router = express.Router();

router.post("/login", validateLogin, userLogin);
router.post("/register", validateRegister, userRegister);

export default router;
