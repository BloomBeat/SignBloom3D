import Ticket from "../models/ticket.js";

export const getTicket = async (req, res) => {
  try {
    const {
      find,
      status,
      period,
      page = 1,
      limit = 20,
      sortOrder = "desc",
    } = req.query;

    // Matched by beginning letters
    // const regex = find ? new RegExp(find, "i") : null;

    // Matched by exact word anywhere
    const regex = find ? new RegExp(`${find}`, "i") : null;

    const skip = (page - 1) * limit;

    const matchCriteria = {};
    if (status) matchCriteria.status = status;
    if (regex) matchCriteria.title = { $regex: regex };

    if (period) {
      const [startYear, startMonth, endYear, endMonth] = period.split(",");
      const startDate = new Date(startYear, startMonth - 1);
      const endDate = new Date(endYear, endMonth, 0);

      matchCriteria.created_at = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const pipeline = [
      { $match: matchCriteria },
      { $sort: { created_at: sortOrder === "asc" ? 1 : -1 } },
      {
        $facet: {
          tickets: [
            { $skip: skip },
            { $limit: Number(limit) },
            {
              $lookup: {
                from: "categories",
                let: { vocabId: "$vocabulary_id" },
                pipeline: [
                  { $unwind: "$vocabularies" },
                  {
                    $match: {
                      $expr: { $eq: ["$vocabularies._id", "$$vocabId"] },
                    },
                  },
                  {
                    $project: {
                      _id: 0,
                      vocabulary: "$vocabularies.name",
                      category: "$category",
                      parts_of_speech: "$vocabularies.parts_of_speech",
                    },
                  },
                ],
                as: "vocabInfo",
              },
            },
            { $unwind: "$vocabInfo" },
            {
              $addFields: {
                vocabulary: "$vocabInfo.vocabulary",
                category: "$vocabInfo.category",
                parts_of_speech: "$vocabInfo.parts_of_speech",
              },
            },
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                status: 1,
                updated_at: 1,
                vocabulary: 1,
                category: 1,
                parts_of_speech: 1,
                // vocabulary_id: 0,
                // user_id: 0,
                // admin_comments: 0,
                // created_at: 0,
              },
            },
          ],
          totalResults: [{ $count: "total" }],
        },
      },
    ];

    const result = await Ticket.aggregate(pipeline).exec();

    const tickets = result[0].tickets;
    const totalCount =
      result[0].totalResults.length > 0 ? result[0].totalResults[0].total : 0;

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      totalResults: totalCount,
      tickets: tickets,
    });
  } catch (err) {
    console.error("Failed to fetch tickets:", err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

export const createTicket = async (req, res) => {
  try {
    const { title, vocabulary_id, user_id, description } = req.body;

    if (!title || !vocabulary_id || !user_id || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const ticket = new Ticket({
      vocabulary_id,
      user_id,
      title,
      description,
      status: "open",
      admin_comments: "",
    });

    await ticket.save();

    res
      .status(201)
      .json({ message: "ticket created successfully", id: ticket.id });
  } catch (err) {
    console.error("Failed to create ticket:", err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { id } = req.query;
    const { description, status, admin_comments } = req.body;

    if (!description && !status && !admin_comments) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updateFields = {};
    if (description) updateFields.description = description;
    if (status) updateFields.status = status;
    if (admin_comments) updateFields.admin_comments = admin_comments;

    const updatedTicket = await Ticket.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Include the user information in the response
    res.status(200).json({
      message: "Ticket updated successfully",
      user: req.user,
      ticket: updatedTicket,
    });
  } catch (err) {
    console.error("Failed to update ticket:", err);
    res.status(500).json({ error: "Failed to update ticket" });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedTicket = await Ticket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({
      message: `Deleted ticket ${id} successfully`,
      ticket: deletedTicket,
    });
  } catch (err) {
    console.error("Failed to delete ticket:", err);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
};
