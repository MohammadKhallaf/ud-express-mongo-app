import type { NextFunction, Request, RequestHandler, Response } from "express";
import Task from "../models/task.model";
import { ObjectId } from "mongodb";

export const createTask: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskObj = { title: req.body.title, description: req.body.description };
  const task = new Task(taskObj);
  task
    .save()
    .then((result) => {
      console.log(result);
      console.log("Task created successfully!");
      return res.status(203).json({ message: "Task created successfully!" });
    })
    .catch((error) => console.log(error));
};

export const getTask: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.params.taskId;

  Task.findById(taskId)
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((err) => {
      console.log("ERROR\t" + err);
      return res.sendStatus(500);
    });
};

export const listAllTasks: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Task.find()
    // fetchAll() #old pure method
    .then((result) => {
      return res.status(200).json({ result });
    });
};

export const updateTask: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.params.taskId;

  try {
    const currentTask = {
      title: req.body.title,
      description: req.body.description,
    };

    // const task = new Task(currentTask.title, currentTask.description, taskId); # old pure method
    console.log(taskId);
    const task = await Task.updateOne({ _id: taskId }, currentTask);
    // const result = await task.save();
    return res.json({ task });
  } catch (error) {
    console.log("Update failed\t" + error);
  }
};

export const deleteTask: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Task.deleteOne({ _id: req.params.taskId })
    .then(() => {
      return res.json({ message: "deleted!" });
    })
    .catch((err) => res.sendStatus(500));
};
