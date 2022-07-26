import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { registerValidation } from "./validation/auth.js";
import { validationResult } from "express-validator";

import UserModel from "./models/User.js";

const mongoUrl = "mongodb://127.0.0.1:27017";
const app = express();
const port = 4444;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("DB is OK");
  })
  .catch((err) => console.log("DB error ", err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/auth/login", (req, res) => {});

app.post("/auth/register", registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    username: req.body.username,
    avatarUrl: req.body.avatarUrl,
    passwordHash: passwordHash,
  });

  const user = await doc.save();

  res.json(user);
});

app.listen(port, (err) => {
  if (err) return console.error(err);

  console.log("Server is OK");
});
