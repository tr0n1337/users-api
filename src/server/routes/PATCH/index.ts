import { Router } from "express";
import { UpdateUserController } from "@/controllers/UpdateUserController";
import { MongoUpdateUserRepository } from "@/repositories/mongo/UpdateUserRepository";
export const route = Router();

route.patch("/users/id/:id", async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateUserRepository();
  const updateUserController = new UpdateUserController(
    mongoUpdateUserRepository,
  );

  const { body, statusCode } = await updateUserController.execute({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});
