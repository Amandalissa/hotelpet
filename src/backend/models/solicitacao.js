import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";
import Cliente from "./cliente.js";

const Solicitacao = sequelize.define("Solicitacao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    observacoes: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    criado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW(),
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
    tableName: "solicitacoes",
    timestamps: false,
});

export default Solicitacao;