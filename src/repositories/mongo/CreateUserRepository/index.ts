import {
  CreateUserRequest,
  ICreateUserRepository,
} from "@/controllers/CreateUserController/protocols";
import { MongoClient } from "@/database/mongo";
import { MongoUser } from "@/repositories";
import { User } from "@/models/users";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(
    params: CreateUserRequest,
  ): Promise<User | null | "emailExists"> {
    const userByEmail = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ email: params?.email });

    if (userByEmail) return "emailExists";

    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) return null;

    const { _id, ...rest } = user ?? {};

    return { id: _id.toHexString(), ...rest };
  }
}
