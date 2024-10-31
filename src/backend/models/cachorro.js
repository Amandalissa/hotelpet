import { DataTypes } from "sequelize";
import sequelize from "../db_config.js";

const Cachorro = sequelize.define("Cachorro", {
    animal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
}, {
    tableName: "cachorros",
    timestamps: false,
});

export default Cachorro;