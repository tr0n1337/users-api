import { HTTPError, HTTPResponse } from "@/controllers/protocols";
import { HTTPResponseError } from "@/helpers/api-errors";
import { IGetUserRepository } from "@/controllers/GetUserController/protocols";
import { ObjectId } from "mongodb";
import { User } from "@/models/users";

export class GetUserService {
  constructor(private readonly getUserRepository: IGetUserRepository) {}
  async getUser(
    id: string | undefined,
  ): Promise<HTTPResponse<User | HTTPError>> {
    try {
      if (!id || !ObjectId.isValid(id)) {
        return HTTPResponseError(400, "ID not found");
      }

      const user = await this.getUserRepository.getUser(id);

      if (!user) return HTTPResponseError(404, "User not found");

      return {
        body: user,
        statusCode: 200,
      };
    } catch (error) {
      return HTTPResponseError();
    }
  }
}
