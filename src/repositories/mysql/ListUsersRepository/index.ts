import { IListUsersRepository, ModelUser } from "@/repositories";
import User from "@/database/models/User";

export class ListUsersRepository implements IListUsersRepository<User> {
  private model: ModelUser = User;
  async listUsers() {
    const users = await this.model.findAll();

    return users;
  }
}
