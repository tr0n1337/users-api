import {
  IUpdateUserRepository,
  UpdateUserRequest,
} from "@/controllers/UpdateUserController/protocols";
import { MongoClient } from "@/database/mongo";
import { MongoUser } from "@/repositories";
import { User } from "@/models/users";
import { ObjectId } from "mongodb";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(
    id: string,
    httpRequest: UpdateUserRequest,
  ): Promise<User | null> {
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...httpRequest,
        },
      },
    );

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) return null;

    const { _id, ...rest } = user ?? {};

    return { id: _id.toHexString(), ...rest };
  }
}
