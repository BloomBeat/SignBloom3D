// server/controllers/vocabController.js
import Category from "../models/category.js"; // Import the Mongoose model

export const vocabSuggestions = async (req, res) => {
  try {
    const query = req.query.find;
    const regex = new RegExp(`^${query}`, "i");
    console.log("Querying categories with regex:", regex);
    const categories = await Category.find({
      $or: [
        { category: { $regex: regex } },
        { "vocabularies.name": { $regex: regex } },
      ],
    });

    console.log("Fetched categories:", categories);
    if (categories.length === 0) {
      console.log("No categories found matching the query.");
    }
    let categorySuggestions = [];
    let vocabularySuggestions = [];

    categories.forEach((category) => {
      if (regex.test(category.category)) {
        categorySuggestions.push({
          name: category.category,
          type: "category",
          category: null,
        });
      }

      category.vocabularies.forEach((vocab) => {
        if (regex.test(vocab.name)) {
          vocabularySuggestions.push({
            name: vocab.name,
            type: "vocabulary",
            category: category.category, // Use category name here
          });
        }
      });
    });

    // Combine and limit suggestions
    const maxSuggestions = 10;
    let suggestions = [...categorySuggestions, ...vocabularySuggestions];
    suggestions = suggestions.slice(0, maxSuggestions);
    console.log("Suggestions:", suggestions);
    res.json({ suggestions });
  } catch (err) {
    console.error("Failed to fetch suggestions:", err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};
