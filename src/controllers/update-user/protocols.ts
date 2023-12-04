import { User } from "@/models/users";

export type UpdateUserParams = {
  firstName?: string;
  lastName?: string;
  password?: string;
};

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
