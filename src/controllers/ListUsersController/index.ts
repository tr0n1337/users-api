import User from "@/database/models/User";
import { ListUsersService } from "@/services/ListUsersService";
import { IController } from "@/controllers/protocols";

export class ListUsersController implements IController<User[]> {
  constructor(private readonly listUsersService: ListUsersService) {}

  async execute() {
    const users = await this.listUsersService.listUsers();

    return users;
  }
}
