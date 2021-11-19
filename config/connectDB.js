import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already Connected");
    return;
  }
  mongoose.connect(process.env.DATABASE_URL, {}, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  });
};

export default connectDB;
