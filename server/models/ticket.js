import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    vocabulary_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "categories", // to tell which collection to use for as a reference for this objectId
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in progress", "closed", "on hold", "canceled"],
      required: true,
    },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    admin_comments: { type: String },
  },
  {
    versionKey: false, // reject "__v" as this is the field generated from mongoose
  }
);

const Ticket = mongoose.model("tickets", ticketSchema);

export default Ticket;
