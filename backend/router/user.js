import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }
  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedPass });
  await newUser.save();

  res.json({ message: "User created!" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (!user) {
    return res.status(404).json({ message: "User doesn't exist!" });
  }
  const isPass = await bcrypt.compare(password, user.password);
  if (!isPass) {
    return res
      .status(404)
      .json({ message: "Username or Password is incorrect!" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, UserID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
