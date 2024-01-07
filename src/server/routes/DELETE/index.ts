import { Router } from "express";
import { DeleteUserRepository } from "@/repositories/mysql/DeleteUserRepository";
import { DeleteUserService } from "@/services/DeleteUserService";
import { DeleteUserController } from "@/controllers/DeleteUserController";
export const route = Router();

route.delete("/users/id", async (_, res) => {
  res.status(404).send({
    message: "ID parameter required",
  });
});

route.delete("/users/id/:id", async (req, res) => {
  const deleteUserRepository = new DeleteUserRepository();
  const deleteUserService = new DeleteUserService(deleteUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserService);

  const { body, statusCode } = await deleteUserController.execute({
    params: req.params,
  });

  res.status(statusCode).send(body);
});
