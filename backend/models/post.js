import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  like: { type: Number, required: true },
  liked: [{ type: String, required: true }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

const postModel = mongoose.model("posts", postSchema);

export default postModel;
