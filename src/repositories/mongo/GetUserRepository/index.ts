import { IGetUserRepository } from "@/controllers/GetUserController/protocols";
import { MongoClient } from "@/database/mongo";
import { MongoUser } from "@/repositories";
import { User } from "@/models/users";
import { ObjectId } from "mongodb";

export class MongoGetUserRepository implements IGetUserRepository {
  async getUser(id: string): Promise<User | null> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) return null;

    const { _id, ...rest } = user ?? {};

    return {
      ...rest,
      id: _id.toHexString(),
    };
  }
}
