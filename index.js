import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const mongoUrl = "mongodb://localhost:27017";
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

app.post("/auth/login", (req, res) => {
  const token = jwt.sign(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    "Strong Hash :D"
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(port, (err) => {
  if (err) return console.error(err);

  console.log("Server is OK");
});
