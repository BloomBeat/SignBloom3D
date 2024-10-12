// /server/routes/vocab.js
import express from "express";
import {
  vocabSuggestions,
  getCategories,
  displayVocab,
  searchVocab,
  updateVocab,
} from "../controllers/vocabController.js";

const router = express.Router();

router.get("/", vocabSuggestions); // Use the controller function as the route handler
router.get("/category", getCategories); // Use the controller function as the route handler
router.get("/word/:id", displayVocab);
router.get("/search", searchVocab);
router.patch("/:id", updateVocab);
export default router;
