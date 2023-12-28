import { User } from "@/models/users";

export interface IGetUserRepository {
  getUser(id: string): Promise<User | null>;
}
