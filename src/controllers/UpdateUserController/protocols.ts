import { User } from "@/models/users";

export type UpdateUserRequest = Partial<Omit<User, "id" | "email">>;

export interface IUpdateUserRepository {
  updateUser(id: string, httpRequest: UpdateUserRequest): Promise<User | null>;
}
