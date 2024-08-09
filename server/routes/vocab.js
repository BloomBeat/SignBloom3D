// /server/routes/vocab.js
import express from "express";
import {
  vocabSuggestions,
  getCategory,
} from "../controllers/vocabController.js";

const router = express.Router();

router.get("/", vocabSuggestions); // Use the controller function as the route handler
router.get("/category", getCategory); // Use the controller function as the route handler
export default router;
