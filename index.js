import express from "express";

const app = express();
const port = 4444;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/auth/login", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(port, (err) => {
  if (err) return console.error(err);

  console.log("Server is OK");
});
