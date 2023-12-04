import * as express from "express";
import { Request, Response } from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";

config();

const app = express();
const port = process.env.PORT || 8000;

app.get("/users", async (req: Request, res: Response) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersControllers = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersControllers.handle();

  res.send(body).status(statusCode);
});

app.listen(port, () => console.log(`listening on port ${port}!`));
