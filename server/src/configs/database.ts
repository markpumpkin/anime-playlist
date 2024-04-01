import { Dialect } from 'sequelize';

type Config = {
    HOST: string;
    USER: string;
    PASSWORD: string;
    DB: string;
    PORT: string;
    dialect: Dialect;
    pool: {
        max: number;
        min: number;
        acquire: number;
        idle: number;
    };
};

export default {
    HOST: process.env.DB_HOST,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DB: process.env.MYSQL_DATABASE,
    PORT: process.env.MYSQL_LOCAL_PORT,
    dialect: 'mysql' as Dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
} as Config;
