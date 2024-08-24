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
    ];

    const totalResultsPipeline = [
      { $unwind: "$vocabularies" },
      { $match: matchCriteria },
      { $count: "total" },
    ];

    const totalResults = await Category.aggregate(totalResultsPipeline);
    const totalCount = totalResults.length > 0 ? totalResults[0].total : 0;

    const vocabularySuggestions = await Category.aggregate(pipeline).exec();

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      totalResults: totalCount,
      suggestions: vocabularySuggestions,
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
