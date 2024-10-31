import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const TokenRecuperacao = sequelize.define("TokenRecuperacao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_papel: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    criado_em: {
        type: DataTypes.DATE(),
        allowNull: false,
        defaultValue: DataTypes.NOW()
    }
}, {
    tableName: "tokens_recuperacao",
    timestamps: false,
});

export default TokenRecuperacao;