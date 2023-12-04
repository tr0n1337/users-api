import { IGetUsersRepository } from "@/controllers/get-users/protocols";
import { MongoClient } from "@/database/mongo";
import { User } from "@/models/users";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    try {
      const users = await MongoClient.db
        .collection<Omit<User, "id">>("users")
        .find({})
        .toArray();

      return users.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toHexString(),
      }));
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      throw error;
    }
  }
}
