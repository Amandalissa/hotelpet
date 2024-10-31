import express from "express";
import bodyParser from "body-parser";
import mainRouter from "./routes/index.js";
import setupDB from "./db_setup.js";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();



const createServer = async () => {
    await setupDB();

    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(mainRouter);

    return app;
}

export default createServer;