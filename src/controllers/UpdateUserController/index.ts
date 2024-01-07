import User from "@/database/models/User";
import { UpdateUserRequest } from "@/repositories";
import { UpdateUserService } from "@/services/UpdateUserService";
import { IController, HTTPRequest } from "@/controllers/protocols";

export class UpdateUserController implements IController<User> {
  constructor(private readonly updateUserService: UpdateUserService) {}
  async execute(httpRequest: HTTPRequest<UpdateUserRequest<User> | null>) {
    const user = await this.updateUserService.updateUser(httpRequest);
    return user;
  }
}
