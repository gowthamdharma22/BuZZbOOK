import mongoose from "mongoose";
import express from "express";
import { verifyToken } from "./user.js";
import postModel from "../models/post.js";
import UserModel from "../models/users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await postModel.find({});
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const post = new postModel(req.body);
  try {
    const data = await post.save();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

router.get("/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findOne({ _id: id });
    res.json({ like: post.like, liked: post.liked });
  } catch (error) {
    res.json(error);
  }
});

router.post("/like/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  try {
    const post = await postModel.findById(id);
    if (post.liked.includes(userID)) {
      res.json(error);
    }
    post.like = req.body.like;
    post.liked.push(userID);
    const update = await post.save();
    res.json({ like: update.like });
  } catch (error) {
    res.json(error);
  }
});

router.put("/like/:id", async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  try {
    const post = await postModel.findById(id);
    if (!post.liked.includes(userID)) {
      res.json(error);
    }
    post.like = req.body.like;
    post.liked.remove(userID);
    const update = await post.save();
    res.json({ like: update.like });
  } catch (error) {
    res.json(error);
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const post = await postModel.findById(req.body.postId);
    const user = await UserModel.findById(req.body.userId);
    user.savedPost.push(post);
    await user.save();
    res.json({ savedPost: user.savedPost });
  } catch (error) {
    res.json(error);
  }
});

router.put("/remove", verifyToken, async (req, res) => {
  try {
    const post = await postModel.findById(req.body.postId);
    const user = await UserModel.findById(req.body.userId);
    user.savedPost.remove(post);
    await user.save();
    res.json({ savedPost: user.savedPost });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedPosts/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.json({ savedPost: user?.savedPost });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedPosts/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const post = await postModel.find({
      _id: { $in: user.savedPost },
    });
    res.json({ post });
  } catch (error) {
    res.json(error);
  }
});

export { router as postRouter };
