import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { registerValidation } from "./validation/auth.js";
import { validationResult } from "express-validator";

import UserModel from "./models/User.js";

const mongoUrl = "mongodb://127.0.0.1:27017/blog";
const app = express();
const port = 4444;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("DB is OK");
  })
  .catch((err) => console.log("DB error ", err));

app.use(express.json());

app.listen(port, (err) => {
  if (err) return console.error(err);

  console.log("Server is OK");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/auth/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User isn't found",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: "Passwords is not correct",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;
    console.log(userData, token);
    res.status(200).json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to login",
      error: err,
    });
  }
});

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      username: req.body.username,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;
    console.log(userData, token);
    res.status(200).json({ ...userData, token });
  } catch (err) {
    if (err)
      res.status(500).json({
        message: "Failed to register",
        error: err,
      });
  }
});
