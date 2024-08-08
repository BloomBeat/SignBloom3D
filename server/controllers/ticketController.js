import Ticket from "../models/ticket.js";

export const getTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    console.error("Failed to fetch tickets:", err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

export const createTicket = async (req, res) => {
  try {
    const { vocabulary_id, user_id, description } = req.body;

    // Validate input
    if (!vocabulary_id || !user_id || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new ticket
    const ticket = new Ticket({
      vocabulary_id,
      user_id,
      description,
      status: "open",
      admin_comments: "", // Default value
    });

    await ticket.save();

    // Respond with the created ticket
    res.status(201).json({
      id: ticket._id,
      vocabulary_id: ticket.vocabulary_id,
      user_id: ticket.user_id,
      description: ticket.description,
      status: ticket.status,
      admin_comments: ticket.admin_comments,
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
    });
  } catch (err) {
    console.error("Failed to create ticket:", err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(`Updating ticket ${id}`);
    const { description, status, admin_comments } = req.body;
    // Validate input fields if necessary
    if (!description && !status && !admin_comments) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Prepare the update object
    const updateFields = {};
    if (description) updateFields.description = description;
    if (status) updateFields.status = status;
    if (admin_comments) updateFields.admin_comments = admin_comments;

    // Perform the update
    const updatedTicket = await Ticket.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validations
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
    res.status(204).json({ message: `deleted ticket: ${id} successfully` });
  } catch (err) {
    console.error("Failed to delete ticket:", err);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
};
