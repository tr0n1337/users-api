import { MongoClient } from "@/database/mongo";
import { User } from "@/models/users";
import {
  CreateUserParams,
  ICreateUserRepository,
} from "@/controllers/create-user/protocols";
import { MongoUser } from "@/repositories/mongo-protocols";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) throw new Error("User not created");

    return MongoClient.mapMongoUserToUser(user);
  }
}
