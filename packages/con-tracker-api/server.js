// import path from "path"
import express from "express";
import dotenv from "dotenv";
import "colors";
import morgan from "morgan";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { connectMONGO } from "./db/conn.js";
import allRoutes from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const VERSION_NUMBER = "1.0.0";
connectMONGO();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(`${VERSION_NUMBER}/api`, allRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `\nServer running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);
