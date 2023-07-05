import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://user22:12345@mern2.j41rlh9.mongodb.net/MERN2"
    );
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
}
