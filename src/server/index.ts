import * as express from "express";
import * as cors from "cors";

import { routes } from "@/server/routes";

const server = express();

server.use(express.json());
server.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // alterar o * para o domínio da aplicação pos deploy.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  server.use(cors);
  next();
});
server.use(routes);

export { server };
