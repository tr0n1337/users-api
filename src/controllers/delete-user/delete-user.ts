import { User } from "@/models/users";
import { HTTPRequest, HTTPResponse } from "@/controllers/protocols";
import {
  IDeleteUserController,
  IDeleteUserRepository,
} from "@/controllers/delete-user/protocols";

export class DeleteUserController implements IDeleteUserController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(httpRequest: HTTPRequest<unknown>): Promise<HTTPResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return {
        statusCode: 200,
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
