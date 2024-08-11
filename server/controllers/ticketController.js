import Ticket from "../models/ticket.js";

// Get Tickets with dynamic filtering
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

    const skip = (page - 1) * limit;
    const matchCriteria = {};

    if (find) {
      const regex = new RegExp(find, "i");
      matchCriteria.title = { $regex: regex };
    }

    if (status) {
      matchCriteria.status = status;
    }

    if (period) {
      const [startYear, startMonth, endYear, endMonth] = period.split(",");

      // Construct the start and end dates
      const startDate = new Date(startYear, startMonth - 1); // Month is 0-based
      const endDate = new Date(endYear, endMonth, 0); // Last day of the end month

      matchCriteria.created_at = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const pipeline = [
      { $match: matchCriteria },
      { $sort: { created_at: sortOrder === "asc" ? 1 : -1 } },
      { $skip: skip },
      { $limit: Number(limit) },
    ];

    const totalResultsPipeline = [
      { $match: matchCriteria },
      { $count: "total" },
    ];

    // Execute aggregation pipelines
    const totalResults = await Ticket.aggregate(totalResultsPipeline);
    const totalCount = totalResults.length > 0 ? totalResults[0].total : 0;

    const tickets = await Ticket.aggregate(pipeline).exec();

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      totalResults: totalCount,
      tickets,
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

    res.status(201).json(ticket);
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

    res.status(200).json(updatedTicket);
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

    res.status(200).json({ message: `Deleted ticket ${id} successfully` });
  } catch (err) {
    console.error("Failed to delete ticket:", err);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
};
