import { MongoClient } from "mongodb";
import { officesCollection } from "./offices/offices.controller.js";

const DATABASE_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const DATABASE_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DATABASE_DB = process.env.MONGO_INITDB_DATABASE;

const URI = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@mongo:27017/${DATABASE_DB}?authSource=admin`;
const client = new MongoClient(URI);

export let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(DATABASE_DB);
    console.log("Connected to MongoDB");

    await db.collection(officesCollection).createIndex(
      { name: 1 },
      { unique: true }
    );
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}