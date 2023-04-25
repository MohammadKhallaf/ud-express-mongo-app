import { ObjectId } from "mongodb";
import { getDb } from "../utils/database";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tasks: [{ taskId: Schema.Types.ObjectId, required: true }],
});

class User {
  username: string;
  email: string;
  _id?: ObjectId;

  constructor(username: string, email: string, id?: string) {
    this.username = username;
    this.email = email;
    this._id = id ? new ObjectId(id) : undefined;
  }

  async save() {
    const db = getDb();
    let dbOperation;

    try {
      if (this._id) {
        dbOperation = await db
          .collection("users")
          .updateOne({ _id: this._id }, { $set: this });
        console.log(
          `${dbOperation.modifiedCount} documents successfully updated.\n`
        );
      } else {
        dbOperation = await db.collection("users").insertOne(this);
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

  static async findById(userId: string) {
    const db = getDb();
    const _id = new ObjectId(userId);

    return await db.collection("users").findOne({ _id });
  }
}
export default mongoose.model("User", userSchema);
