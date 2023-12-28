import { HTTPError, HTTPResponse } from "@/controllers/protocols";
import { HTTPResponseError } from "@/helpers/api-errors";
import { ObjectId } from "mongodb";
import { User } from "@/models/users";
import { IDeleteUserRepository } from "@/controllers/DeleteUserController/protocols";

export class DeleteUserService {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async deleteUser(
    id: string | undefined,
  ): Promise<HTTPResponse<User | HTTPError>> {
    try {
      if (!id || !ObjectId.isValid(id)) {
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
