import {
  HTTPError,
  HTTPRequest,
  HTTPResponse,
  IController,
} from "@/controllers/protocols";
import {
  CreateUserRequest,
  ICreateUserRepository,
} from "@/controllers/CreateUserController/protocols";
import { User } from "@/models/users";
import { CreateUserService } from "@/service/CreateUserService";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async execute(
    httpRequest: HTTPRequest<CreateUserRequest | null>,
  ): Promise<HTTPResponse<User | HTTPError>> {
    const createUserService = new CreateUserService(this.createUserRepository);

    const user = await createUserService.createUser(httpRequest);
    return user;
  }
}
