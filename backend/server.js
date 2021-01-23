import express from "express";
// import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRouter.js";
import feedRoutes from "./routes/feedRouter.js";
import { notFound, errHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  //log the api response time
  //app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/feeds", feedRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT ? process.env.PORT : 5000;

app.listen(
  PORT,
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
  )
);
