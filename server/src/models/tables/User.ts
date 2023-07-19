import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    ModelScopeOptions,
    ModelValidateOptions,
} from "sequelize";
import { sequelize } from "..";

export type UsersProps = {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    refreshToken: string | null;
    permission?: number;
};

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: UsersProps["id"];
    declare email: UsersProps["email"];
    declare username: UsersProps["username"];
    declare password: UsersProps["password"];
    declare refreshToken: UsersProps["refreshToken"];
    declare permission: UsersProps["permission"];

    static readonly scopes: ModelScopeOptions = {};
    static readonly validations: ModelValidateOptions = {};
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        email: { type: DataTypes.STRING(255), allowNull: false },
        username: { type: DataTypes.STRING(255), allowNull: false },
        password: { type: DataTypes.STRING(255), allowNull: false },
        refreshToken: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },
        permission: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 2,
        },
    },
    {
        tableName: "users",
        sequelize,
        updatedAt: true,
        createdAt: true,
        scopes: User.scopes,
        validate: User.validations,
    }
);

export default User;
