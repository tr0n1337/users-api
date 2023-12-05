import { User } from "@/models/users";
import {
  HTTPRequest,
  HTTPResponse,
  IController,
} from "@/controllers/protocols";
import {
  IUpdateUserRepository,
  UpdateUserParams,
} from "@/controllers/update-user/protocols";
import {
  successRequest,
  badRequest,
  internalServerError,
} from "@/controllers/helpers";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HTTPRequest<UpdateUserParams>,
  ): Promise<HTTPResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) return badRequest("Missing fields");

      if (!id) return badRequest("Missing user id");

      const allowedFieldsToUpdated: (keyof UpdateUserParams | string)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body)?.some(
        (key) => !allowedFieldsToUpdated.includes(key),
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return successRequest(user);
    } catch (error) {
      return internalServerError(error);
    }
  }
}
