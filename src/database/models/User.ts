import { Model, DataTypes } from "sequelize";
import db from "@/database/models";

class User extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare password: string;
  declare email: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "user",
    timestamps: false,
  },
);

export default User;
