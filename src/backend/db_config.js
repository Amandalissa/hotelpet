import { Sequelize } from "sequelize";

const sequelizeTemp = new Sequelize(null, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false
});

await sequelizeTemp.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
await sequelizeTemp.close()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false
});

export default sequelize;