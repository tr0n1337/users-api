import { User } from "@/models/users";

export interface IListUsersRepository {
  listUsers(): Promise<User[]>;
}
