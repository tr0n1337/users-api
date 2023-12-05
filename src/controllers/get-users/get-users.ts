import { IGetUsersRepository } from "@/controllers/get-users/protocols";
import { HTTPResponse, IController } from "@/controllers/protocols";
import { successRequest, internalServerError } from "@/controllers/helpers";
import { User } from "@/models/users";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}
  async handle(): Promise<HTTPResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return successRequest(users);
    } catch (error) {
      return internalServerError(error);
    }
  }
}
