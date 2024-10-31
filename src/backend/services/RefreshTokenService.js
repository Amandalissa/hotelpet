class RefreshTokenService {
    constructor(refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    async getRefreshTokenValueById(id) {
        let token = await this.refreshTokenRepository.findById(id);

        return token ? token.token : null;
    }
}

export default RefreshTokenService;