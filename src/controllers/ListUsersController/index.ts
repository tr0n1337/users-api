import { IListUsersRepository } from "@/controllers/ListUsersController/protocols";
import { HTTPError, HTTPResponse, IController } from "@/controllers/protocols";
import { User } from "@/models/users";
import { ListUsersService } from "@/service/ListUsersService";

export class ListUsersController implements IController {
  constructor(private readonly getUsersRepository: IListUsersRepository) {}

  async execute(): Promise<HTTPResponse<User[] | HTTPError>> {
    const listUsersService = new ListUsersService(this.getUsersRepository);

    const users = await listUsersService.listUsers();

    return users;
  }
}
