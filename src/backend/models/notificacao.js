import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const Notificacao = sequelize.define("Notificacao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    texto: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    criado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW(),
    },
    nome_papel: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    tableName: "notificacoes",
    timestamps: false,
});

export default Notificacao;