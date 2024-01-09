import { Options } from "sequelize";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST } =
  process.env;

const config: Options = {
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST,
  dialect: "mysql",
};

export = config;
