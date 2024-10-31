import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const SuporteSolicitacao = sequelize.define("SuporteSolicitacao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    mensagem: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('open', 'in progress', 'closed'),
        allowNull: false,
        defaultValue: 'open'
    },
    criado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "suporte_solicitacao",
    timestamps: false,
});

export default SuporteSolicitacao;
