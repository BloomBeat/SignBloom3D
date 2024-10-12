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
  //TODO : add 3 fileds more
});

const Vocabulary = mongoose.model("vocabularies", vocabularySchema);

export default Vocabulary;
