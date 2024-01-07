import { Sequelize } from "sequelize";
import * as config from "@/database/config/database";

export default new Sequelize(config);
