import User from "@/database/models/User";
import {
  ICreateUserRepository,
  ModelUser,
  CreateUserRequest,
} from "@/repositories";

export class CreateUserRepository implements ICreateUserRepository<User> {
  private model: ModelUser = User;
  async createUser(params: CreateUserRequest<User>) {
    const userByEmail = await this.model.findOne({
      where: { email: params?.email },
    });

    if (userByEmail) return "emailExists";

    const { id } = await this.model.create({
      ...params,
    });

    if (!id) return null;

    const user = await this.model.findByPk(id);

    if (!user) return null;

    return user;
  }
}
