import { User } from "@/models/users";
import {
  HTTPRequest,
  HTTPResponse,
  IController,
} from "@/controllers/protocols";
import { IDeleteUserRepository } from "@/controllers/delete-user/protocols";
import {
  successRequest,
  badRequest,
  internalServerError,
} from "@/controllers/helpers";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(
    httpRequest: HTTPRequest<unknown>,
  ): Promise<HTTPResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) return badRequest("Missing user id");

      const user = await this.deleteUserRepository.deleteUser(id);

      return successRequest(user);
    } catch (error) {
      return internalServerError(error);
    }
  }
}
