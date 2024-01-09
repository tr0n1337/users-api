import { Model, DataTypes } from "sequelize";
import { v4 as uuid } from "uuid";
import db from "@/database/models";

class User extends Model {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare password: string;
  declare email: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuid(),
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
    tableName: "users",
    modelName: "User",
    timestamps: true,
  },
);

export default User;
