import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB database connected successfully 💥");
  } catch (error) {
    console.error("❌ MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDatabase;
