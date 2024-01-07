import { IGetUserRepository, ModelUser } from "@/repositories";
import User from "@/database/models/User";

export class GetUserRepository implements IGetUserRepository<User> {
  private model: ModelUser = User;

  async getUser(id: string) {
    const user = await this.model.findOne({ where: { id } });

    if (!user) return null;

    return user;
  }
}
