import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const RefreshToken = sequelize.define("RefreshToken", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
    },
    atualizado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW(),
    },
}, {
    tableName: "refresh_tokens",
    timestamps: false,
});

export default RefreshToken;