import { Router } from "express";
import { ListUsersController } from "@/controllers/ListUsersController";
import { MongoListUsersRepository } from "@/repositories/mongo/ListUsersRepository";
import { MongoGetUserRepository } from "@/repositories/mongo/GetUserRepository";
import { GetUserController } from "@/controllers/GetUserController";

export const route = Router();

route.get("/users", async (_, res) => {
  const mongoListUsersRepository = new MongoListUsersRepository();
  const listUsersController = new ListUsersController(mongoListUsersRepository);

  const { body, statusCode } = await listUsersController.execute();

  res.status(statusCode).send(body);
});

route.get("/users/id", async (_, res) => {
  res.status(404).send({
    message: "ID parameter required",
    statusCode: 404,
  });
});

route.get("/users/id/:id", async (req, res) => {
  const mongoGetUserRepository = new MongoGetUserRepository();
  const getUserController = new GetUserController(mongoGetUserRepository);

  const { body, statusCode } = await getUserController.execute({
    params: req.params,
  });

  res.status(statusCode).send(body);
});
