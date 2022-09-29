import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
export const app = express();
import { Router } from "./routes/routes.js";

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api", Router);

app.use(express.static(path.resolve("./z_frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./z_frontend/build/index.html"));
});