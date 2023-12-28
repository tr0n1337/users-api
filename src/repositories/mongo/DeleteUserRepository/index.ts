import { IDeleteUserRepository } from "@/controllers/DeleteUserController/protocols";
import { MongoClient } from "@/database/mongo";
import { MongoUser } from "@/repositories";
import { User } from "@/models/users";
import { ObjectId } from "mongodb";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User | null> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) return null;

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) return null;

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
