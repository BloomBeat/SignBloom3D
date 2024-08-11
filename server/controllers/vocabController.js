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
