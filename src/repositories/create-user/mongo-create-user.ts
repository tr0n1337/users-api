import { MongoClient } from "@/database/mongo";
import { User } from "@/models/users";
import {
  CreateUserParams,
  ICreateUserRepository,
} from "@/repositories/create-user/protocols";

export class MongoCreateUser implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) throw new Error("User not created");

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
