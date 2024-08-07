import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const dbConfig = process.env.MONGODB_URI; // MongoDB URI from environment variables

// Connect to the database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbConfig);
    const dbName = mongoose.connection.db.databaseName;
    console.log(`Successfully connected to the ${dbName}`);
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1); // Exit process with failure
  }
};

export { connectToDatabase };
