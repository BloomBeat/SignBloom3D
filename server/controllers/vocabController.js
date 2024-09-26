import Category from "../models/category.js";
import Vocabulary from "../models/vocabulary.js";
import mongoose from "mongoose";

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

    const matchCriteria = {
      ...(regex ? { name: { $regex: regex } } : {}),
      ...(parts_of_speech ? { parts_of_speech: parts_of_speech } : {}),
      ...(author ? { author } : {}),
    };

    const pipeline = [
      {
        $match: matchCriteria, // Initial filter for name, parts_of_speech, and author
      },
      ...(category
        ? [
            {
              $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $match: {
                "category.category": category, // Filter by category after lookup
              },
            },
          ]
        : []),
      { $sort: { updated_at: sortOrder === "asc" ? 1 : -1 } }, // Sort the documents
      {
        $facet: {
          suggestions: [
            ...(sortAlphabet ? [{ $sort: { name: 1 } }] : []), // Optional sorting by name
            { $skip: skip }, // Skip the first n documents
            { $limit: Number(limit) }, // Limit the number of documents
            {
              $project: {
                name: 1,
                description: 1,
                parts_of_speech: 1,
                author: 1,
                updated_at: 1,
                category: { $arrayElemAt: ["$category.category", 0] }, // Get the category name
              },
            },
          ],
          totalResults: [{ $count: "total" }], // Count total results
        },
      },
    ];

    const result = await Vocabulary.aggregate(pipeline).exec();

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
    const vocabId = mongoose.Types.ObjectId.createFromHexString(id); // Convert the id to ObjectId
    console.log(vocabId);
    const pipeline = [
      { $match: { _id: vocabId } }, // Find the specific vocabulary by id
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "tickets", // Lookup in the 'tickets' collection
          localField: "_id", // Match vocabulary id with ticket's vocabulary_id
          foreignField: "vocabulary_id",
          as: "tickets",
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          parts_of_speech: 1,
          author: 1,
          updated_at: 1,
          category: { $arrayElemAt: ["$category.category", 0] },
          ticket_status: {
            $cond: {
              if: { $gt: [{ $size: "$tickets" }, 0] }, // Check if there are tickets
              then: { $arrayElemAt: ["$tickets.status", 0] }, // Get the first ticket's status
              else: null, // If no tickets, return null
            },
          },
        },
      },
    ];

    const result = await Vocabulary.aggregate(pipeline).exec();
    if (result.length === 0) {
      return res.status(404).json({ error: "Word not found" });
    }
    const vocab = result[0];
    res.status(200).json(vocab);
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

    // const pipeline = [
    //   {
    //     $unwind: "$vocabularies",
    //   },
    //   {
    //     $match: {
    //       "vocabularies.name": { $regex: regex },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$category",
    //       vocab: { $first: "$vocabularies" },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: "$vocab._id", // Include the _id of the vocabulary
    //       name: "$vocab.name", // Include the name of the vocabulary
    //       category: "$_id", // Include the category
    //     },
    //   },
    //   {
    //     $limit: 6,
    //   },
    // ];

    const pipeline = [
      {
        $match: {
          name: { $regex: regex },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          category_id: 1,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          category: { $arrayElemAt: ["$category.category", 0] },
        },
      },
      {
        $limit: 6,
      },
    ];

    const categories = await Vocabulary.aggregate(pipeline);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};
