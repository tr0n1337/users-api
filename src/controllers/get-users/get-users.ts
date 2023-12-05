import { IGetUsersRepository } from "@/controllers/get-users/protocols";
import { IController } from "@/controllers/protocols";
import { successRequest, internalServerError } from "@/controllers/helpers";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}
  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return successRequest(users);
    } catch (error) {
      return internalServerError(error);
    }
  }
}
