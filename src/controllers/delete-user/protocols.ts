import { User } from "@/models/users";

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
