import { Router } from "express";
import { CreateUserRepository } from "@/repositories/mysql/CreateUserRepository";
import { CreateUserService } from "@/services/CreateUserService";
import { CreateUserController } from "@/controllers/CreateUserController";
export const route = Router();

route.post("/users", async (req, res) => {
  const createUserRepository = new CreateUserRepository();
  const createUserService = new CreateUserService(createUserRepository);
  const createUserController = new CreateUserController(createUserService);

  const { body, statusCode } = await createUserController.execute({
    body: req.body,
  });

  res.status(statusCode).send(body);
});
