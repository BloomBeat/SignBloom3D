// server/models/category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: { type: String },
  image: { type: String },
  // vocabularies: { type: [vocabularySchema] },
  created_at: { type: Date },
  updated_at: { type: Date },
});

const Category = mongoose.model("categories", categorySchema);

export default Category;
