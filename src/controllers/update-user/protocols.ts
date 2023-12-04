import { User } from "@/models/users";
import { HTTPRequest, HTTPResponse } from "../protocols";

export type UpdateUserParams = {
  firstName?: string;
  lastName?: string;
  password?: string;
};

export type id = string;
export interface IUpdateUserController {
  handle(
    httpRequest: HTTPRequest<UpdateUserParams>,
  ): Promise<HTTPResponse<User>>;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
