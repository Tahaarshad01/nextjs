import mongoose from "mongoose";

const conn = async () => {
  try {
    const URI = "mongodb://127.0.0.1:27017/nextjs";

    await mongoose.connect(URI);

    console.log("Connected to the database");
  } catch (error: any) {
    console.error("Error connecting to the database:", error.message);
  }
};

export default conn;
