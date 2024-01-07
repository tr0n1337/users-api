import User from "@/database/models/User";
import { GetUserService } from "@/services/GetUserService";
import { IController, HTTPRequest } from "@/controllers/protocols";

export class GetUserController implements IController<User> {
  constructor(private readonly getUserService: GetUserService) {}

  async execute(httpRequest: HTTPRequest<unknown>) {
    const { id } = httpRequest?.params ?? {};

    const user = await this.getUserService.getUser(id);

    return user;
  }
}
