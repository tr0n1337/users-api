import { MongoClient as Mongo, Db, ObjectId } from "mongodb";
import { MongoUser } from "@/repositories/mongo-protocols";
import { User } from "@/models/users";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "localhost:27017";
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("users-db");

    this.client = client;
    this.db = db;

    console.log("connect to mongodb!");
  },

  mapMongoUserToUser(user: { _id: ObjectId } & MongoUser): User {
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  },
};
