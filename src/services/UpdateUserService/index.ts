import User from "@/database/models/User";
import { IUpdateUserRepository, UpdateUserRequest } from "@/repositories";
import { HTTPRequest } from "@/controllers/protocols";
import { HTTPResponseError } from "@/helpers/httpResponseError";

export class UpdateUserService {
  constructor(
    private readonly updateUserRepository: IUpdateUserRepository<User>,
  ) {}

  async updateUser(httpRequest: HTTPRequest<UpdateUserRequest<User> | null>) {
    try {
      const fields = ["firstName", "lastName"];
      const notChangeable = ["email", "password"];
      const { params, body } = httpRequest ?? {};

      if (!params?.id) {
        return HTTPResponseError(400, "ID not found");
      }

      if (!body || Object.keys(body).length === 0) {
        return HTTPResponseError(400, "Please specify a body");
      }

      const fieldsNotChangeable = Object.keys(body).filter((field) =>
        notChangeable.includes(field),
      );

      if (fieldsNotChangeable.length > 0) {
        return HTTPResponseError(
          400,
          `Field '${fieldsNotChangeable.join(", ")}' is not changeable`,
        );
      }

      const invalidFields = Object.keys(body).filter(
        (field) => !fields.includes(field),
      );

      if (invalidFields.length > 0) {
        return HTTPResponseError(
          400,
          `Invalid fields: ${invalidFields.join(", ")}`,
        );
      }

      const user = await this.updateUserRepository.updateUser(params?.id, body);

      if (!user) {
        return HTTPResponseError(400, "Unable to update user");
      }

      return {
        body: user,
        statusCode: 200,
      };
    } catch (error) {
      return HTTPResponseError();
    }
  }
}
