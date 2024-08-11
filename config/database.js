import mongoose from "mongoose";

export const connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/ecom`
    );
    console.log(`\nMongoDB connected to ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("DB connection failed");
    console.error(error);
    process.exit(1);
  }
};
