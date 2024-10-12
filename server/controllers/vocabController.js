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
        $match: matchCriteria,
      },
      // Join with categories collection and filter by category if provided
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
                "category.category": category,
              },
            },
          ]
        : []),
      { $sort: { updated_at: sortOrder === "asc" ? 1 : -1 } },
      {
        $facet: {
          suggestions: [
            ...(sortAlphabet ? [{ $sort: { name: 1 } }] : []),
            { $skip: skip },
            { $limit: Number(limit) },
            {
              $project: {
                name: 1,
                description: 1,
                parts_of_speech: 1,
                author: 1,
                updated_at: 1,
                category: { $arrayElemAt: ["$category.category", 0] },
              },
            },
          ],
          totalResults: [{ $count: "total" }],
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
    const vocabId = mongoose.Types.ObjectId.createFromHexString(id);
    console.log(vocabId);
    const pipeline = [
      { $match: { _id: vocabId } },
      // Join with categories collection to get the category name
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      // Join with tickets collection to get the status of the ticket
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
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
              if: { $gt: [{ $size: "$tickets" }, 0] },
              then: { $arrayElemAt: ["$tickets.status", 0] },
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
    const categories = await Category.find({}, { category: 1 }).lean();
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
      // Join with categories collection to get the category name
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

export const addVocab = async (req, res) => {
  try {
    const {
      category_id,
      name,
      description,
      parts_of_speech,
      image,
      author,
      animation_clip_id,
      intro_gap,
      outro_gap,
    } = req.body;

    // Check if a vocabulary with the same name and category_id already exists
    const existingVocab = await Vocabulary.findOne({ name, category_id });
    if (existingVocab) {
      return res.status(400).json({ error: "Vocabulary already exists" });
    }

    const newVocab = new Vocabulary({
      category_id,
      name,
      description,
      parts_of_speech,
      image: image || "vocab_placeholder",
      author,
      animation_clip_id,
      intro_gap,
      outro_gap,
    });

    const savedVocab = await newVocab.save();

    res.status(201).json(savedVocab);
  } catch (err) {
    console.error("Failed to add vocabulary:", err);
    res.status(400).json({ error: "Failed to add vocabulary" });
  }
};
