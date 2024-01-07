import User from "@/database/models/User";
import {
  IUpdateUserRepository,
  ModelUser,
  UpdateUserRequest,
} from "@/repositories";
export class UpdateUserRepository implements IUpdateUserRepository<User> {
  private model: ModelUser = User;

  async updateUser(id: string, httpRequest: UpdateUserRequest<User>) {
    const updatedUser = await this.model.update(httpRequest, { where: { id } });

    if (!updatedUser) return null;

    const user = await this.model.findByPk(id);

    if (!user) return null;

    return user;
  }
}
