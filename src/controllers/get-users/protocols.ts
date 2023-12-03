import { User } from "@/models/users";
import { HTTPResponse } from "../protocols";

export interface IGetUsersController {
  handle(): Promise<HTTPResponse<User[]>>;
}

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
