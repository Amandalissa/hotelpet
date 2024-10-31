import { accessTokenContentGenerator } from "../helpers/accessTokenContentGenerator.js";
import { roleToService } from "../helpers/roleServiceMapper.js";

class AuthController {
    
    constructor(authService) {
        this.authService = authService;
    }

    newAccessToken = async (request, response) => {
        const authorization = request.headers['authorization'];

        if (!authorization) {
            return response.status(401).send({ "success": false, "content": "Refresh token não informado" });
        }

        const token = authorization.split(" ")[1];
        const userInfo = await this.authService.findUserRoleAndIdByRefreshToken(token);

        if(!userInfo) {
            return response.status(403).send({ "success": false, "content": "Refresh token inválido" });
        }

        const user = await roleToService(userInfo.role).findById(userInfo.id);

        return response.json({ success: true, content: await this.authService.generateAuthTokens(user) });
    }
}

export default AuthController;