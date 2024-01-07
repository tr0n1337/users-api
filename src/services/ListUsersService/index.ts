import User from "@/database/models/User";
import { IListUsersRepository } from "@/repositories";
import { HTTPError, HTTPResponse } from "@/controllers/protocols";
import { HTTPResponseError } from "@/helpers/httpResponseError";

export class ListUsersService {
  constructor(
    private readonly listUsersRepository: IListUsersRepository<User>,
  ) {}

  async listUsers(): Promise<HTTPResponse<User[] | HTTPError>> {
    try {
      const users = await this.listUsersRepository.listUsers();

      if (!users) {
        return HTTPResponseError(400, "Unable to find users");
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
