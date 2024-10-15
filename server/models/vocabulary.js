import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "categories",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  parts_of_speech: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  animation_clip_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AnimationClip", // Assuming this is the name of the model in the Sign Recorder Database
  },
  intro_gap: {
    type: Number, // Storing timestamp as a number
    default: 0,
  },
  outro_gap: {
    type: Number, // Storing timestamp as a number
    default: 0,
  },
});

const Vocabulary = mongoose.model("vocabularies", vocabularySchema);

export default Vocabulary;
