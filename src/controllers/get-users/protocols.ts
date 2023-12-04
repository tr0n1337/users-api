import { User } from "@/models/users";

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}
