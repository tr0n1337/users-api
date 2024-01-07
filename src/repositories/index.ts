import User from "@/database/models/User";
import { ModelStatic } from "sequelize";

export type ModelUser = ModelStatic<User>;
export type CreateUserRequest<T> = Omit<T, "id">;
export type UpdateUserRequest<T> = Partial<
  Omit<T, "id" | "email" | "password">
>;

export interface IListUsersRepository<T> {
  listUsers(): Promise<T[]>;
}

export interface IGetUserRepository<T> {
  getUser(id: string): Promise<T | null>;
}

export interface IDeleteUserRepository<T> {
  deleteUser(id: string): Promise<T | null>;
}

export interface ICreateUserRepository<T> {
  createUser(
    httpRequest: CreateUserRequest<T>,
  ): Promise<T | null | "emailExists">;
}

export interface IUpdateUserRepository<T> {
  updateUser(id: string, httpRequest: UpdateUserRequest<T>): Promise<T | null>;
}
