"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCases = void 0;
const userRepository_interface_1 = require("../../domain/repositories/users/userRepository.interface");
class LoginUseCases {
    constructor(logger, jwtTokenService, jwtConfig, userRepository, bcryptService) {
        this.logger = logger;
        this.jwtTokenService = jwtTokenService;
        this.jwtConfig = jwtConfig;
        this.userRepository = userRepository;
        this.bcryptService = bcryptService;
    }
    async getCookieWithJwtToken(username) {
        this.logger.log('LoginUseCases execute', `The user ${username} have been logged.`);
        const payload = { username: username };
        const secret = this.jwtConfig.getJwtSecret();
        const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
    }
    async getCookieWithJwtRefreshToken(username) {
        this.logger.log('LoginUseCases execute', `The user ${username} have been logged.`);
        const payload = { username: username };
        const secret = this.jwtConfig.getJwtRefreshSecret();
        const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
        return cookie;
    }
    async validateUserForLocalStragtegy(username, pass) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return null;
        }
        const match = await this.bcryptService.compare(pass, user.password);
        return null;
    }
    async validateUserForJWTStragtegy(username) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return null;
        }
        return user;
    }
    async getUserIfRefreshTokenMatches(refreshToken, username) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user)
            return null;
        const isTokenValid = await this.jwtTokenService.verifyToken(refreshToken, this.jwtConfig.getJwtRefreshSecret());
        if (!isTokenValid)
            return null;
        return user;
    }
}
exports.LoginUseCases = LoginUseCases;
//# sourceMappingURL=login.usecases.js.map