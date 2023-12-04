import { User } from "@/models/users";

export type CreateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
