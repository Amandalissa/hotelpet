import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const Reserva = sequelize.define("Reserva", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    valor: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    data_hora_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_hora_fim: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    acomodacao_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    animal_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: "reservas",
    timestamps: false,
});

export default Reserva;