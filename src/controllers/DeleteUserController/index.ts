import User from "@/database/models/User";
import { DeleteUserService } from "@/services/DeleteUserService";
import { IController, HTTPRequest } from "@/controllers/protocols";

export class DeleteUserController implements IController<User> {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  async execute(httpRequest: HTTPRequest<unknown>) {
    const { id } = httpRequest?.params ?? {};

    const user = await this.deleteUserService.deleteUser(id);

    return user;
  }
}
