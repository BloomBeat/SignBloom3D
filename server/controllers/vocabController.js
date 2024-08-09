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
    let vocabularySuggestions = [];

    categories.forEach((category) => {
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
    
    // TODO: WUT in query database can use $limit
    // TODO: do pagination limit skip
    // ref: https://stackoverflow.com/a/5540562
    // ref: https://stackoverflow.com/a/14822142
    const maxSuggestions = 10;
    vocabularySuggestions = vocabularySuggestions.slice(0, maxSuggestions);
    res.status(200).json({ vocabularySuggestions });
  } catch (err) {
    console.error("Failed to fetch suggestions:", err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};

export const displayVocab = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the category containing the vocabulary with the specified ID
    const category = await Category.findOne(
      { "vocabularies._id": id },
      { "vocabularies.$": 1 }
    );

    if (!category) {
      return res.status(404).json({ error: "Word not found" });
    }

    // Extract the vocabulary item from the category
    const vocab = category.vocabularies[0];

    // Send the vocabulary item as the response
    res.status(200).json({
      _id: vocab._id,
      name: vocab.name,
      description: vocab.description,
      parts_of_speech: vocab.parts_of_speech,
      image: vocab.image,
      author: vocab.author,
      created_at: vocab.created_at,
      updated_at: vocab.updated_at,
    });
  } catch (err) {
    console.error("Failed to fetch word:", err);
    res.status(500).json({ error: "Failed to fetch word" });
  }
};
