import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";
import Endereco from "./endereco.js";

const Cliente = sequelize.define("Cliente", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
    },
    celular: {
        type: DataTypes.STRING(12),
        allowNull: false,
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    endereco_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    refresh_token_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    },
}, {
    tableName: "clientes",
    timestamps: false,
    scopes: {
        safe: {
            attributes: {
                exclude: ["refresh_token_id", "senha"],
            },
        },
    },
});

Cliente.belongsTo(Endereco, {
    foreignKey: 'endereco_id',
    as: 'endereco'
});

export default Cliente;
