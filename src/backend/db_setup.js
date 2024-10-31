import sequelize from "./db_config.js";
import "./models/index.js";


const setup = async () => {
    return sequelize.sync();
}

export default setup;