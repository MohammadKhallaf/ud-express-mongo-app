import { ObjectId } from "mongodb";
import { getDb } from "../utils/database";
import mongoose, { Schema } from "mongoose";

// structure helps you work with the data

const taskSchema = new Schema({
  // _id is automatically added
  title: { type: String, required: true },
  description: { type: String, required: false },
});

// this is the old class used with pure mongoclient without mongoose
class Task {
  // assingedFrom: User;
  // assignedTo: User;
  title: string;
  description: string;
  // status: Status;
  _id?: ObjectId;
  userId?: ObjectId;

  constructor(
    // assingedFrom: User,
    // assignedTo: User,
    title: string,
    description: string,
    id?: string,
    userId?: string
    // status: Status
  ) {
    // this.assingedFrom = assingedFrom;
    // this.assignedTo = assignedTo;
    this.title = title;
    this.description = description;
    this._id = id ? new ObjectId(id) : undefined; // important not to create a dummy id object when creating a new task
    this.userId = userId ? new ObjectId(userId) : undefined; // important not to create a dummy id object when creating a new task
    // this.status = status;
  }

  async save() {
    const db = getDb();
    let dbOperation;

    try {
      if (this._id) {
        dbOperation = await db
          .collection("tasks")
          .updateOne({ _id: this._id }, { $set: this });
        console.log(
          `${dbOperation.modifiedCount} documents successfully updated.\n`
        );
      } else {
        dbOperation = await db.collection("tasks").insertOne(this);
        console.log(
          `${dbOperation.insertedId} documents successfully inserted.\n`
        );
      }

      return dbOperation;
    } catch (error) {
      console.error(
        `Something went wrong trying to insert the new documents: ${error}\n`
      );
    }
  }

  static async fetchAll() {
    const db = getDb();
    try {
      const tasksCursor = db.collection("tasks").find();
      const tasks = await tasksCursor.toArray();
      console.log(tasks);

      return tasks;
    } catch (error) {
      console.error(
        `Something went wrong trying to fetach documents: ${error}\n`
      );
    }
  }

  static async findById(taskId: string) {
    const db = getDb();
    const _id = new ObjectId(taskId);

    try {
      const taskCursor = db.collection("tasks").find({ _id });
      const task = await taskCursor.next();
      console.log(task);

      return task;
    } catch (error) {
      console.error(
        `Something went wrong trying to fetach documents: ${error}\n`
      );
    }
  }

  static async deleteById(taskId: string) {
    const db = getDb();
    const _id = new ObjectId(taskId);
    try {
      const result = await db.collection("tasks").deleteOne({ _id });
      console.log(`${result.deletedCount} documents successfully deleted.\n`);

      return result;
    } catch (error) {
      console.error(
        `Something went wrong trying to delete documents: ${error}\n`
      );
    }
  }
}

// export default Task;
export default mongoose.model("Task", taskSchema);
