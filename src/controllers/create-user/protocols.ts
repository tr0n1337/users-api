import { User } from "@/models/users";
import { HTTPRequest, HTTPResponse } from "@/controllers/protocols";

export interface ICreateUserController {
  handle(
    httpRequest: HTTPRequest<CreateUserParams>,
  ): Promise<HTTPResponse<User>>;
}

export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
