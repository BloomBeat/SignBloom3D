import Category from "../models/category.js";

export const vocabSuggestions = async (req, res) => {
  try {
    const {
      find,
      category,
      parts_of_speech,
      author,
      page = 1,
      limit = 20,
      sortOrder = "desc",
      sortAlphabet = false,
    } = req.query;

    const regex = find ? new RegExp(`^${find}`, "i") : null;
    const skip = (page - 1) * limit;

    const matchCriteria = {};
    if (category) matchCriteria.category = category;
    if (regex) matchCriteria["vocabularies.name"] = { $regex: regex };
    if (parts_of_speech)
      matchCriteria["vocabularies.parts_of_speech"] = parts_of_speech;
    if (author) matchCriteria["vocabularies.author"] = author;

    const pipeline = [
      { $unwind: "$vocabularies" },
      { $sort: { "vocabularies.updated_at": sortOrder === "asc" ? 1 : -1 } },
      { $match: matchCriteria },
      {
        $facet: {
          suggestions: [
            ...(sortAlphabet ? [{ $sort: { "vocabularies.name": 1 } }] : []),
            { $skip: skip },
            { $limit: Number(limit) },
            {
              $project: {
                // _id: 0, // Uncomment this line if _id needs to be excluded
                name: "$vocabularies.name",
                category: "$category",
                parts_of_speech: "$vocabularies.parts_of_speech",
                description: "$vocabularies.description",
                author: "$vocabularies.author",
                updated_at: "$vocabularies.updated_at",
              },
            },
          ],
          totalResults: [{ $count: "total" }],
        },
      },
    ];

    const result = await Category.aggregate(pipeline).exec();

    const suggestions = result[0].suggestions;
    const totalCount =
      result[0].totalResults.length > 0 ? result[0].totalResults[0].total : 0;

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      totalResults: totalCount,
      suggestions: suggestions,
    });
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

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, { _id: 0, category: 1 }).lean();
    // Map the result to return an array of strings
    const categoryList = categories.map((cat) => cat.category);

    res.status(200).json(categoryList);
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const searchVocab = async (req, res) => {
  try {
    const find = req.query.find;
    const regex = find ? new RegExp(`^${find}`, "i") : null;

    const pipeline = [
      {
        $unwind: "$vocabularies",
      },
      {
        $match: {
          "vocabularies.name": { $regex: regex },
        },
      },
      {
        $group: {
          _id: "$category",
          vocab: { $first: "$vocabularies" },
        },
      },
      {
        $project: {
          _id: "$vocab._id", // Include the _id of the vocabulary
          name: "$vocab.name", // Include the name of the vocabulary
          category: "$_id", // Include the category
        },
      },
      {
        $limit: 6,
      },
    ];

    const categories = await Category.aggregate(pipeline);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};

export const addVocab = async (req, res) => {
  try {
    const { category_id, name, description, parts_of_speech, image, author } =
      req.body;
    const find = await Category.find({
      _id: category_id,
      "vocabularies.name": name,
    });
    if (find.length > 0) {
      return res.status(400).json({ error: "Vocabulary already exists" });
    }
    const newVocab = {
      name,
      description,
      parts_of_speech: parts_of_speech || "",
      image: image || "vocab_placeholder",
      author,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const updatedCategory = await Category.findByIdAndUpdate(
      category_id,
      {
        $push: {
          vocabularies: newVocab,
        },
      },
      { new: true }
    );

    // Find the newly added vocabulary
    const addedVocab = updatedCategory.vocabularies.find(
      (v) => v.name === name
    );

    // Format the response
    const formattedVocab = {
      _id: addedVocab._id.toString(),
      name: addedVocab.name,
      description: addedVocab.description,
      parts_of_speech: addedVocab.parts_of_speech,
      created_at: addedVocab.created_at.toISOString(),
      updated_at: addedVocab.updated_at.toISOString(),
      image: addedVocab.image,
      author: addedVocab.author,
    };

    res.status(200).json(formattedVocab);
  } catch (err) {
    console.error("Failed to add vocabulary:", err);
    res.status(400).json({ error: "Failed to add vocabulary" });
  }
};
