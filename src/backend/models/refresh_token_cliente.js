import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const RefreshTokenCliente = sequelize.define("RefreshTokenCliente", {
    refresh_token_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
}, {
    tableName: "refresh_tokens_clientes",
    timestamps: false,
});

export default RefreshTokenCliente;