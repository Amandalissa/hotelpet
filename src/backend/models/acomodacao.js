import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";
import Hotel from "./hotel.js";

const Acomodacao = sequelize.define("Acomodacao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    maximo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: "acomodacoes",
    timestamps: false,
});

export default Acomodacao;