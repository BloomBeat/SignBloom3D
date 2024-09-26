// server/models/category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: { type: String },
    image: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
  }
  // Alternatively, you can use the timestamps option to automatically add the created_at and updated_at fields:
  // { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Category = mongoose.model("categories", categorySchema);

export default Category;
