import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const RefreshTokenAdmin = sequelize.define("RefreshTokenAdmin", {
    refresh_token_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
}, {
    tableName: "refresh_tokens_admins",
    timestamps: false,
});

export default RefreshTokenAdmin;