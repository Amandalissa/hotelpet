import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const Admin = sequelize.define("Admin", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
    },
    root: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    refresh_token_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    }
}, {
    tableName: "admins",
    timestamps: false,
    scopes: {
        safe: {
            attributes: {
                exclude: ["refresh_token_id", "password"]
            }
        }
    }
});

export default Admin;