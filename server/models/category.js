// server/models/category.js
import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  parts_of_speech: { type: String },
  image: { type: String },
  author: { type: String }, // Add author field
  created_at: { type: Date },
  updated_at: { type: Date },
});

const categorySchema = new mongoose.Schema({
  category: { type: String },
  image: { type: String },
  vocabularies: { type: [vocabularySchema] },
  created_at: { type: Date },
  updated_at: { type: Date },
});

const Category = mongoose.model("categories", categorySchema);

export default Category;
