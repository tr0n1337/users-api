import { IGetUsersRepository } from "@/controllers/get-users/protocols";
import { User } from "@/models/users";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Thiago",
        lastName: "Fernandes",
        email: "thiago.souzax3@outlook.com",
        password: "123456",
      },
    ];
  }
}
