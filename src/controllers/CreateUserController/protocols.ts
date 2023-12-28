import { User } from "@/models/users";

export type CreateUserRequest = Omit<User, "id">;

export interface ICreateUserRepository {
  createUser(httpRequest: CreateUserRequest): Promise<User | null>;
}
