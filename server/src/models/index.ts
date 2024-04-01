import { Sequelize } from "sequelize";
import dbConfig from "../configs/database";

export const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: parseInt(dbConfig.PORT),
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
        timezone: "+07:00",
        define: {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: true,
        },
    }
);

export default { sequelize: sequelize.sync() };
