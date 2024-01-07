import { HTTPError, HTTPResponse } from "@/controllers/protocols";
import { HTTPResponseError } from "@/helpers/httpResponseError";
import { IDeleteUserRepository } from "@/repositories";
import User from "@/database/models/User";

export class DeleteUserService {
  constructor(
    private readonly deleteUserRepository: IDeleteUserRepository<User>,
  ) {}
  async deleteUser(
    id: string | undefined,
  ): Promise<HTTPResponse<User | HTTPError>> {
    try {
      if (!id) {
        return HTTPResponseError(400, "ID not found");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

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
