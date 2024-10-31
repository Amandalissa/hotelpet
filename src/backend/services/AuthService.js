import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { modelToRole } from "../helpers/RoleModelMapper.js";
import { accessTokenContentGenerator } from "../helpers/accessTokenContentGenerator.js";
import { roleRepository } from "../helpers/roleRepositoryMapper.js";

class AuthService {
    jwtAccessTokenTime = "1h";
    saltRounds = 10;
    refreshTokenSize = 64;

    constructor(userRepository, refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    generateAcessToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: this.jwtAccessTokenTime});
    }

    generateRefreshToken() {
        return crypto.randomBytes(this.refreshTokenSize).toString('hex');
    }

    async generateAuthTokens(user) {
        let userDataToken = accessTokenContentGenerator(user)
        let refreshToken = await this.refreshTokenRepository.createOne(this.generateRefreshToken(), userDataToken.role);

        await roleRepository(userDataToken.role).updateOne(userDataToken.id, {refresh_token_id: refreshToken.id});

        return {
            token: this.generateAcessToken(userDataToken),
            refresh: refreshToken.token
        }
    }

    async findUserRoleAndIdByRefreshToken(refreshToken) {
        const user = await this.userRepository.findUserAssociatedWithRefreshToken(refreshToken);

        return user ? {role: modelToRole(user), id: user.id} : null;
    }

    async generateHashFromPassword(plainPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(this.saltRounds, (error, salt) => {
                if(error) {
                    reject(`[Erro ao gerar Salt] ${error}`);
                }

                bcrypt.hash(plainPassword, salt, (error_hash, hash) => {
                    if(error_hash) {
                        reject(`[Erro ao gerar hash] ${error_hash}`);
                    }

                    resolve(hash);
                });
            });
        });
    }
}

export default AuthService;