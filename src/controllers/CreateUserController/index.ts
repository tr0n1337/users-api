import User from "@/database/models/User";
import { CreateUserRequest } from "@/repositories";
import { CreateUserService } from "@/services/CreateUserService";
import { IController, HTTPRequest } from "@/controllers/protocols";

export class CreateUserController implements IController<User> {
  constructor(private readonly createUserService: CreateUserService) {}

  async execute(httpRequest: HTTPRequest<CreateUserRequest<User> | null>) {
    const user = await this.createUserService.createUser(httpRequest);

    return user;
  }
}
