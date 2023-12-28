import { Router } from "express";
import { MongoDeleteUserRepository } from "@/repositories/mongo/DeleteUserRepository";
import { DeleteUserController } from "@/controllers/DeleteUserController";
export const route = Router();

route.delete("/users/id", async (_, res) => {
  res.status(404).send({
    message: "ID parameter required",
    statusCode: 404,
  });
});

route.delete("/users/id/:id", async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();
  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository,
  );

  const { body, statusCode } = await deleteUserController.execute({
    params: req.params,
  });

  res.status(statusCode).send(body);
});
