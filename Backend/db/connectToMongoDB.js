import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_DB_URI;

    if (!mongoURI) {
      throw new Error("MongoDB connection string (MONGO_DB_URI) not found");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectToMongoDB;
