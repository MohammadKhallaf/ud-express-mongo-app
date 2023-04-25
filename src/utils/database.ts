import { MongoClient, Db } from "mongodb";

let _db: Db;
// pattern for db connection booling

export const mongoConnect = (callback: (arg0: MongoClient) => void) => {
  // return the connected client
  MongoClient.connect(process.env.MONGODB_URL!)
    .then((client) => {
      console.log("Connected!");
      _db = client.db(process.env.MONGDB_NAME); // store the database in variable
      callback(client);
    })
    .catch((error) => {
      console.warn(error);
      throw error;
    });
};

export const getDb = () => {
  // get the database if it's available
  if (_db) return _db;
  throw "No database found!";
};
