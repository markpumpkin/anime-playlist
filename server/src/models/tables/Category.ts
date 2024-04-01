import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    ModelScopeOptions,
    ModelValidateOptions,
} from "sequelize";
import { sequelize } from "..";

export type CategoryProps = {
    id?: number;
    title?: string;
    thumbnail?: string;
    description?: string;
};

class Category extends Model<
    InferAttributes<Category>,
    InferCreationAttributes<Category>
> {
    declare id: CategoryProps["id"];
    declare title: CategoryProps["title"];
    declare thumbnail: CategoryProps["thumbnail"];
    declare description: CategoryProps["description"];

    static readonly scopes: ModelScopeOptions = {};
    static readonly validations: ModelValidateOptions = {};
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumbnail: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "categories",
        sequelize,
        charset: "utf8",
        collate: "utf8_general_ci",
        updatedAt: true,
        createdAt: true,
        scopes: Category.scopes,
        validate: Category.validations,
    }
);

export default Category;
