import { Router } from "express";
import { route as GET } from "@/server/routes/GET";
import { route as POST } from "@/server/routes/POST";
import { route as PATCH } from "@/server/routes/PATCH";
import { route as DELETE } from "@/server/routes/DELETE";
export const routes = Router();

routes.use(GET);
routes.use(POST);
routes.use(PATCH);
routes.use(DELETE);
routes.use((_, res) => res.status(404).send({ message: "Route not found" }));
