import * as express from "express";
import { Request, Response } from "express";
import { config } from "dotenv";
import { MongoClient } from "@/database/mongo";
import { GetUsersController } from "@/controllers/get-users";
import { CreateUserController } from "@/controllers/create-user";
import { UpdateUserController } from "@/controllers/update-user";
import { DeleteUserController } from "@/controllers/delete-user";
import { MongoGetUsersRepository } from "@/repositories/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "@/repositories/create-user/mongo-create-user";
import { MongoUpdateUserRepository } from "@/repositories/update-user/mongo-update-user";
import { MongoDeleteUserRepository } from "@/repositories/delete-user/mongo-delete-user";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (req: Request, res: Response) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req: Request, res: Response) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository,
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (req: Request, res: Response) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository,
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req: Request, res: Response) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository,
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
