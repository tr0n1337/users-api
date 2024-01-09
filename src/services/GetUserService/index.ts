import User from "@/database/models/User";
import { validate as uuidValidate } from "uuid";
import { HTTPError, HTTPResponse } from "@/controllers/protocols";
import { HTTPResponseError } from "@/helpers/httpResponseError";
import { IGetUserRepository } from "@/repositories";

export class GetUserService {
  constructor(private readonly getUserRepository: IGetUserRepository<User>) {}
  async getUser(
    id: string | undefined,
  ): Promise<HTTPResponse<User | HTTPError>> {
    try {
      if (!id || !uuidValidate(id)) {
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
