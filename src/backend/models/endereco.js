import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const Endereco = sequelize.define("Endereco", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pais: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "Brasil",
    },
    estado: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    rua: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: "enderecos",
    timestamps: false,
});

export default Endereco;