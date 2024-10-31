import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const Hotel = sequelize.define("Hotel", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    razao_social: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    cnpj: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true,
    },
    celular: {
        type: DataTypes.STRING(12),
        allowNull: false,
    },
    aprovado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    endereco_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    refresh_token_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },
}, {
    tableName: "hoteis",
    timestamps: false,
    scopes: {
        safe: {
            attributes: {
                exclude: ["refresh_token_id", "senha"]
            }
        }
    }
});

export default Hotel;