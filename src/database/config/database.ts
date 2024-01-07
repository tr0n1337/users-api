import { Options } from "sequelize";
import "dotenv/config";

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

const config: Options = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  dialect: "mysql",
};

export = config;
