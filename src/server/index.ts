import "dotenv/config";
import * as express from "express";
import * as cors from "cors";

import { routes } from "@/server/routes";

const app = express();

app.use(express.json());
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // alterar o * para o domínio da aplicação pos deploy.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  app.use(cors);
  next();
});
app.use(routes);

export { app };
