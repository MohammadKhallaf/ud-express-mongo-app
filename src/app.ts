import "dotenv/config.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import loggerMiddleware from "./middlewares/logger";
import indexRouter from "./routes/index";
import usersRouter from "./routes/user.route";
import tasksRouter from "./routes/task.route";

import { mongoConnect } from "./utils/database";

const app: Application = express();

/* Setup middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ methods: "GET,PUT,PATCH,POST,DELETE" }));
app.use(loggerMiddleware);

app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

app.use("/", indexRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

// mongoConnect((client) => {
//   app.listen(3000);
// });

mongoose
  .connect(process.env.MONGODB_URL!, { dbName: process.env.MONGDB_NAME }) // as alternative for the pure mongoclient
  .then(() => {
    console.log("Connected to mongoose");
    app.listen(3000);
  })
  .catch((error) => console.log("Error while setup mongoose\t" + error));

export default app;
