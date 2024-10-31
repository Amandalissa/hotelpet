import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const RefreshTokenHotel = sequelize.define("RefreshTokenHotel", {
    refresh_token_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
}, {
    tableName: "refresh_tokens_hoteis",
    timestamps: false,
});

export default RefreshTokenHotel;