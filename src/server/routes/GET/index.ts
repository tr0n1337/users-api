import { Router } from "express";
import { ListUsersRepository } from "@/repositories/mysql/ListUsersRepository";
import { ListUsersService } from "@/services/ListUsersService";
import { ListUsersController } from "@/controllers/ListUsersController";
import { GetUserRepository } from "@/repositories/mysql/GetUserRepository";
import { GetUserService } from "@/services/GetUserService";
import { GetUserController } from "@/controllers/GetUserController";

export const route = Router();

route.get("/users", async (_, res) => {
  const listUsersRepository = new ListUsersRepository();
  const listUsersService = new ListUsersService(listUsersRepository);
  const listUsersController = new ListUsersController(listUsersService);

  const { body, statusCode } = await listUsersController.execute();

  res.status(statusCode).send(body);
});

route.get("/users/id", async (_, res) => {
  res.status(404).send({
    message: "ID parameter required",
  });
});

route.get("/users/id/:id", async (req, res) => {
  const getUserRepository = new GetUserRepository();
  const getUserService = new GetUserService(getUserRepository);
  const getUserController = new GetUserController(getUserService);

  const { body, statusCode } = await getUserController.execute({
    params: req.params,
  });

  res.status(statusCode).send(body);
});
