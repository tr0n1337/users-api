import { User } from "@/models/users";
import {
  HTTPRequest,
  HTTPResponse,
  IController,
} from "@/controllers/protocols";
import {
  CreateUserParams,
  ICreateUserRepository,
} from "@/controllers/create-user/protocols";
import validator from "validator";
import {
  badRequest,
  createdRequest,
  internalServerError,
} from "@/controllers/helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HTTPRequest<CreateUserParams>,
  ): Promise<HTTPResponse<User | string>> {
    try {
      const { body } = httpRequest ?? {};
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const emailIsValid = validator.isEmail(body!.email);

      if (!emailIsValid) return badRequest("E-mail is invalid");

      const user = await this.createUserRepository.createUser(body!);

      return createdRequest(user);
    } catch (error) {
      return internalServerError(error);
    }
  }
}
