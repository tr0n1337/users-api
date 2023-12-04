import { User } from "@/models/users";

export type UpdateUserPrams = {
  firstName?: string;
  lastName?: string;
  password?: string;
};

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserPrams): Promise<User>;
}
