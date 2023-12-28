import {
  IUpdateUserRepository,
  UpdateUserRequest,
} from "@/controllers/UpdateUserController/protocols";
import { HTTPRequest } from "@/controllers/protocols";
import { HTTPResponseError } from "@/helpers/api-errors";
import { ObjectId } from "mongodb";

export class UpdateUserService {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async updateUser(httpRequest: HTTPRequest<UpdateUserRequest | null>) {
    try {
      const fields = ["firstName", "lastName", "password"];
      const { params, body } = httpRequest || {};

      if (!params?.id || !ObjectId.isValid(params?.id)) {
        return HTTPResponseError(400, "ID not found");
      }

      if (!body || Object.keys(body).length === 0) {
        return HTTPResponseError(400, "Please specify a body");
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
