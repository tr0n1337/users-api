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

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HTTPRequest<CreateUserParams>,
  ): Promise<HTTPResponse<User>> {
    try {
      const { body } = httpRequest ?? {};
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const emailIsValid = validator.isEmail(body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
        };
      }

      const user = await this.createUserRepository.createUser(body!);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
        error,
      };
    }
  }
}
