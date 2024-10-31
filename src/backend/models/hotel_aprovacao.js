import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const HotelAprovacao = sequelize.define("HotelAprovacao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    aprovado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    criado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    finalizado_em: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    criado_por: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    atendido_por: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    tableName: "hoteis_aprovacoes",
    timestamps: false,
});

export default HotelAprovacao;