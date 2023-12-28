import { User } from "@/models/users";
import {
  HTTPError,
  HTTPRequest,
  HTTPResponse,
  IController,
} from "@/controllers/protocols";
import {
  IUpdateUserRepository,
  UpdateUserRequest,
} from "@/controllers/UpdateUserController/protocols";
import { UpdateUserService } from "@/service/UpdateUserService";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async execute(
    httpRequest: HTTPRequest<UpdateUserRequest | null>,
  ): Promise<HTTPResponse<User | HTTPError>> {
    const updateUserService = new UpdateUserService(this.updateUserRepository);

    const user = await updateUserService.updateUser(httpRequest);
    return user;
  }
}
