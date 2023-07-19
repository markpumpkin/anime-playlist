import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    ModelScopeOptions,
    ModelValidateOptions,
} from "sequelize";
import { sequelize } from "..";

export type VideoProps = {
    id?: number;
    source: string;
    value: string;
    label: string;
    category: string;
    thumbnail?: string;
};

class Video extends Model<
    InferAttributes<Video>,
    InferCreationAttributes<Video>
> {
    declare id: VideoProps["id"];
    declare source: VideoProps["source"];
    declare value: VideoProps["value"];
    declare label: VideoProps["label"];
    declare thumbnail: VideoProps["thumbnail"];
    declare category: VideoProps["category"];

    static readonly scopes: ModelScopeOptions = {};
    static readonly validations: ModelValidateOptions = {};
}

Video.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        source: {
            type: DataTypes.STRING(255),
        },
        value: {
            type: DataTypes.STRING(255),
        },
        label: {
            type: DataTypes.STRING(255),
        },
        thumbnail: {
            type: DataTypes.TEXT,
        },
        category: {
            type: DataTypes.TEXT,
        },
    },
    {
        tableName: "videos",
        sequelize,
        updatedAt: true,
        createdAt: true,
        scopes: Video.scopes,
        validate: Video.validations,
    }
);

export default Video;
