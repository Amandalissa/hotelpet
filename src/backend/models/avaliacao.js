import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";
import Hotel from "./hotel.js";

const Avaliacao = sequelize.define("Avaliacao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nota: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Hotel,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: "avaliacoes",
    timestamps: false,
});

export default Avaliacao;