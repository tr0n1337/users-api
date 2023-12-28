import { GetUserService } from "@/service/GetUserService";
import {
  HTTPError,
  HTTPRequest,
  HTTPResponse,
  IController,
} from "@/controllers/protocols";
import { IGetUserRepository } from "@/controllers/GetUserController/protocols";
import { User } from "@/models/users";

export class GetUserController implements IController {
  constructor(private readonly getUserRepository: IGetUserRepository) {}

  async execute(
    httpRequest: HTTPRequest<unknown>,
  ): Promise<HTTPResponse<User | HTTPError>> {
    const getUserService = new GetUserService(this.getUserRepository);

    const { id } = httpRequest?.params ?? {};

    const user = await getUserService.getUser(id);

    return user;
  }
}
