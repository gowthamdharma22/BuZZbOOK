import express from "express";
import cors from "cors";
import { userRouter } from "./router/user.js";
import { postRouter } from "./router/post.js";
import { connectDB } from "./config/connectDB.js";

const app = express();
const PORT = 5000;

app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: "*" }));

app.use("/auth", userRouter);
app.use('/posts', postRouter);

connectDB();

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
