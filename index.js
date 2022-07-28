import express from "express";
import mongoose from "mongoose";
import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validation.js";
import checkAuth from "./utils/checkAuth.js";
import checkAccess from "./utils/checkAccess.js";
import * as UserControllers from "./controllers/UserController.js";
import * as PostControllers from "./controllers/PostController.js";

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

app.post("/auth/login", loginValidation, UserControllers.login);
app.post("/auth/register", registerValidation, UserControllers.register);
app.get("/auth/me", checkAuth, UserControllers.getMe);

app.get("/posts", PostControllers.getAll);
app.get("/posts/:id", PostControllers.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostControllers.create);
app.delete("/posts/:id", checkAuth, checkAccess, PostControllers.remove);
app.patch("/posts/:id", checkAuth, checkAccess, PostControllers.update);
