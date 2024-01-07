import User from "@/database/models/User";
import { IDeleteUserRepository, ModelUser } from "@/repositories";

export class DeleteUserRepository implements IDeleteUserRepository<User> {
  private model: ModelUser = User;

  async deleteUser(id: string) {
    const user = await this.model.findOne({ where: { id } });

    if (!user) return null;

    const deletedUser = await this.model.destroy({ where: { id } });

    if (deletedUser === 0) return null;

    return user;
  }
}
