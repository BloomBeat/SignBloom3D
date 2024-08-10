// /server/routes/vocab.js
import express from "express";
import {
  displayVocab,
  vocabSuggestions,
} from "../controllers/vocabController.js";

const router = express.Router();

router.get("/", vocabSuggestions); // Use the controller function as the route handler
router.get("/word/:id", displayVocab);
export default router;
