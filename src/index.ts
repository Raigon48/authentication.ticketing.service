import express from "express";
import { json } from "body-parser";

const app = express();

app.use(json());

app.get("/api/users/currentuser", (_req, res) => {
  res.send("Hello World Wow Now");
});

app.listen(3000, () => {
  console.log("Listening to port 3000!!!!");
});
