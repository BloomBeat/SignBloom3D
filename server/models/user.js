import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  hearing_level: { type: String, required: true },
  interpreter_group: { type: String, required: true },
  curriculum: { type: String, required: true },
  curr_time: { type: Date, required: true },
  institution: { type: String, required: true },
  picture_profile: { type: String, required: true },
  role: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
