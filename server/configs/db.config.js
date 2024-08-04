import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const dbConfig = process.env.MONGODB_URI; // Default to a local MongoDB instance if no URI is provided

// Connect to the database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbConfig);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1); // Exit process with failure
  }
};

export { connectToDatabase };
