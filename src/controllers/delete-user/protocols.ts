import { User } from "@/models/users";
import { HTTPRequest, HTTPResponse } from "@/controllers/protocols";

export interface IDeleteUserController {
  handle(httpRequest: HTTPRequest<unknown>): Promise<HTTPResponse<User>>;
}

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
