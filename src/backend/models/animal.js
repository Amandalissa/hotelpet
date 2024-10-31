import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";
import Cliente from "./cliente.js";

const Animal = sequelize.define("Animal", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    tamanho: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    sexo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    temperamento: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    raca: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "animais",
    timestamps: false,
});

Animal.belongsTo(Cliente, {
    foreignKey: 'cliente_id',
    as: 'cliente'
});

export default Animal;
