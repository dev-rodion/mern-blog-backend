import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validation.js";

import {
  checkAuth,
  checkAccess,
  handleValidationErrors,
} from "./utils/index.js";

import { PostControllers, UserControllers } from "./controllers/index.js";

const mongoUrl = "mongodb://127.0.0.1:27017/blog";
const app = express();
const port = 4444;

app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("DB is OK");
  })
  .catch((err) => console.log("DB error ", err));

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "./uploads/");
  },
  filename: function (_, file, cb) {
    const prefix = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-";
    cb(null, prefix + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserControllers.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserControllers.register
);
app.get("/auth/me", checkAuth, UserControllers.getMe);

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}`, success: true });
});

app.get("/posts", PostControllers.getAll);
app.get("/posts/:id", PostControllers.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostControllers.create);
app.delete("/posts/:id", checkAuth, checkAccess, PostControllers.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  checkAccess,
  postCreateValidation,
  PostControllers.update
);

app.listen(port, (err) => {
  if (err) return console.error(err);
  console.log("Server is OK");
});
