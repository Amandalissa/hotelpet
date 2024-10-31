import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const Gato = sequelize.define("Gato", {
    animal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
}, {
    tableName: "gatos",
    timestamps: false,
});

export default Gato;