import * as express from "express";
import { Request, Response } from "express";
import { config } from "dotenv";
import { MongoClient } from "@/database/mongo";
import { GetUsersController } from "@/controllers/get-users/get-users";
import { CreateUserController } from "@/controllers/create-user/create-user";
import { MongoGetUsersRepository } from "@/repositories/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "@/repositories/create-user/mongo-create-user";

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

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
