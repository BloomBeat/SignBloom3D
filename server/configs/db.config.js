import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to the database");
    return;
  }

  try {
    await mongoose.connect(dbConfig);
    const dbName = mongoose.connection.db.databaseName;
    console.log(`Successfully connected to the ${dbName}`);
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

export { connectToDatabase };
