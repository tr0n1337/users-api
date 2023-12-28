import { User } from "@/models/users";
import { IListUsersRepository } from "@/controllers/ListUsersController/protocols";
import { MongoClient } from "@/database/mongo";
import { MongoUser } from "@/repositories";

export class MongoListUsersRepository implements IListUsersRepository {
  async listUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    return users?.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
