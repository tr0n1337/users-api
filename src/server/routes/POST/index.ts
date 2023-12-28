import { Router } from "express";
import { MongoCreateUserRepository } from "@/repositories/mongo/CreateUserRepository";
import { CreateUserController } from "@/controllers/CreateUserController";
export const route = Router();

route.post("/users", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();
  const createUserController = new CreateUserController(
    mongoCreateUserRepository,
  );

  const { body, statusCode } = await createUserController.execute({
    body: req.body,
  });

  res.status(statusCode).send(body);
});
