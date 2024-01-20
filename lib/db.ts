import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

const connectDB = async () => {
  try {
    const client = await mongoose.connect(MONGODB_URI);
    console.log("Connected to database");
    return client;
  } catch (error) {
    throw new Error("Could not connect to database");
  }
};

export const dbClient = connectDB();
