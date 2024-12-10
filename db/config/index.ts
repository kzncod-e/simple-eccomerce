import { Db, MongoClient } from "mongodb";
const connectionsString = process.env.MONGODB_CONNECTION_STRING;

if (!connectionsString) {
  throw new Error("MONGODB_CONNECTION_STRING is  not defined");
}

let client: MongoClient;
let db: Db;
export const getDb = async () => {
  if (!client) {
    client = await MongoClient.connect(connectionsString);
    await client.connect();
    db = client.db("fullstack-test");
  }
  return db;
};
