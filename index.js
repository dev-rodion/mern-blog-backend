import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validation/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserControllers from "./controllers/UserController.js";

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

app.post("/auth/login", UserControllers.login);

app.post("/auth/register", registerValidation, UserControllers.register);

app.get("/auth/me", checkAuth, UserControllers.getMe);
