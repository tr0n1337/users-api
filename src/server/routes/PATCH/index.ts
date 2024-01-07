import { Router } from "express";
import { UpdateUserRepository } from "@/repositories/mysql/UpdateUserRepository";
import { UpdateUserService } from "@/services/UpdateUserService";
import { UpdateUserController } from "@/controllers/UpdateUserController";
export const route = Router();

route.patch("/users/id", async (_, res) => {
  res.status(404).send({
    message: "ID parameter required",
  });
});

route.patch("/users/id/:id", async (req, res) => {
  const updateUserRepository = new UpdateUserRepository();
  const updateUserService = new UpdateUserService(updateUserRepository);
  const updateUserController = new UpdateUserController(updateUserService);

  const { body, statusCode } = await updateUserController.execute({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});
