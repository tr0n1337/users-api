import validator from "validator";
import { User } from "@/models/users";
import {
  CreateUserRequest,
  ICreateUserRepository,
} from "@/controllers/CreateUserController/protocols";
import { HTTPError, HTTPRequest, HTTPResponse } from "@/controllers/protocols";
import { HTTPResponseError } from "@/helpers/api-errors";

export class CreateUserService {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async createUser(
    httpRequest: HTTPRequest<CreateUserRequest | null>,
  ): Promise<HTTPResponse<User | HTTPError>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];
      const { body } = httpRequest || {};

      if (!body || Object.keys(body).length === 0) {
        return HTTPResponseError(400, "Please specify a body");
      }

      const invalidFields = Object.keys(body).filter(
        (field) => !requiredFields.includes(field),
      );

      const missingFields = requiredFields.filter(
        (field) => !body[field as keyof Omit<User, "id">],
      );

      if (invalidFields.length > 0) {
        return HTTPResponseError(
          400,
          `Invalid fields: ${invalidFields.join(", ")}`,
        );
      }

      if (missingFields.length > 0) {
        return HTTPResponseError(
          400,
          `Missing required fields: ${missingFields.join(", ")}`,
        );
      }

      const emailIsValid = validator.isEmail(body?.email);
      if (body?.email && !emailIsValid) {
        return HTTPResponseError(400, "Invalid email");
      }

      const users = await this.createUserRepository.createUser(body);

      if (!users) {
        return HTTPResponseError(400, "Unable to create user");
      }

      return {
        body: users,
        statusCode: 200,
      };
    } catch (error) {
      return HTTPResponseError();
    }
  }
}
