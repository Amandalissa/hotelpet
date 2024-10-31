import "dotenv/config";
import createServer from "./server.js";

const app = createServer();

app.then((server) => {
    server.listen(process.env.PORT, () => {
        console.log(`Executando em ${process.env.HOST}:${process.env.PORT}`);
    });
});