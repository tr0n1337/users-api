import { DeleteUserService } from "@/service/DeleteUserService";
import {
  HTTPError,
  HTTPRequest,
  HTTPResponse,
  IController,
} from "@/controllers/protocols";
import { IDeleteUserRepository } from "@/controllers/DeleteUserController/protocols";
import { User } from "@/models/users";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async execute(
    httpRequest: HTTPRequest<unknown>,
  ): Promise<HTTPResponse<User | HTTPError>> {
    const getUserService = new DeleteUserService(this.deleteUserRepository);

    const { id } = httpRequest?.params ?? {};

    const user = await getUserService.deleteUser(id);

    return user;
  }
}
