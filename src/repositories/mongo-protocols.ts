import { User } from "@/models/users";

export type MongoUser = Omit<User, "id">;
