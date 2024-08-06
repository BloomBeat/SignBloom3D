import Category from "../models/category.js";

export const vocabSuggestions = async (req, res) => {
  try {
    const { find, category, parts_of_speech, author } = req.query;
    const regex = new RegExp(`^${find}`, "i");

    // Build the query object
    let query = {
      $or: [
        { category: { $regex: regex } }, // Match category names with the search query
        { "vocabularies.name": { $regex: regex } }, // Match vocabulary names with the search query
      ],
    };

    if (category) {
      query.category = category;
    }
    if (parts_of_speech) {
      query["vocabularies.parts_of_speech"] = parts_of_speech;
    }
    if (author) {
      query["vocabularies.author"] = author;
    }

    const categories = await Category.find(query);

    // let categorySuggestions = [];
    let vocabularySuggestions = [];

    categories.forEach((category) => {
      // As this is for search results, this is unnecessary to fetch the suggestions.
      // if (regex.test(category.category)) {
      //   categorySuggestions.push({
      //     name: category.category,
      //     type: "category",
      //     category: null,
      //   });
      // }

      category.vocabularies.forEach((vocab) => {
        if (
          regex.test(vocab.name) &&
          (!parts_of_speech || vocab.parts_of_speech === parts_of_speech) &&
          (!author || vocab.author === author)
        ) {
          vocabularySuggestions.push({
            name: vocab.name,
            category: category.category,
            parts_of_speech: vocab.parts_of_speech,
            description: vocab.description,
            author: vocab.author,
            updated_at: vocab.updated_at.toLocaleDateString(),
          });
        }
      });
    });

    const maxSuggestions = 10;
    // let suggestions = [...categorySuggestions, ...vocabularySuggestions];
    // suggestions = suggestions.slice(0, maxSuggestions);
    vocabularySuggestions = vocabularySuggestions.slice(0, maxSuggestions);
    // res.json({ suggestions });
    res.json({ vocabularySuggestions });
  } catch (err) {
    console.error("Failed to fetch suggestions:", err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};
