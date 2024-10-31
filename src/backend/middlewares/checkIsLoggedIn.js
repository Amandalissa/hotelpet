import "dotenv/config";
import { roleToService } from "../helpers/roleServiceMapper.js";
import jwt from "jsonwebtoken";


export const checkIsLoggedIn = (request, response, next) => {
    const authorization = request.headers['authorization'];

    if (!authorization) {
        return response.status(401).send({ "success": false, content: "Token não informado", authReject: "[TOKEN-NOT-FOUND]" });
    }

    const jwtToken = authorization.split(" ")[1];

    jwt.verify(jwtToken, process.env.JWT_SECRET, async (error, data) => {
        if (error) {
            return response.status(403).send({ "success": false, content: "Acesso não autorizado!", authReject: "[INVALID-TOKEN]" });
        }

        request.user = await roleToService(data.role).findById(data.id);

        next();
    });
}