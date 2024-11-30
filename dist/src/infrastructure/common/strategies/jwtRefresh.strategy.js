"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshTokenStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const environment_config_service_1 = require("../../config/environment-config/environment-config.service");
const usecases_proxy_module_1 = require("../../usecases-proxy/usecases-proxy.module");
const usecases_proxy_1 = require("../../usecases-proxy/usecases-proxy");
const logger_service_1 = require("../../logger/logger.service");
const exceptions_service_1 = require("../../exceptions/exceptions.service");
let JwtRefreshTokenStrategy = class JwtRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh-token') {
    constructor(configService, loginUsecaseProxy, logger, exceptionService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    var _a;
                    return (_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.Refresh;
                },
            ]),
            secretOrKey: configService.getJwtRefreshSecret(),
            passReqToCallback: true,
        });
        this.configService = configService;
        this.loginUsecaseProxy = loginUsecaseProxy;
        this.logger = logger;
        this.exceptionService = exceptionService;
    }
    async validate(request, payload) {
        var _a;
        const refreshToken = (_a = request.cookies) === null || _a === void 0 ? void 0 : _a.Refresh;
        const user = this.loginUsecaseProxy.getInstance().getUserIfRefreshTokenMatches(refreshToken, payload.username);
        if (!user) {
            this.logger.warn('JwtStrategy', `User not found or hash not correct`);
            this.exceptionService.UnauthorizedException({ message: 'User not found or hash not correct' });
        }
        return user;
    }
};
JwtRefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.LOGIN_USECASES_PROXY)),
    __metadata("design:paramtypes", [environment_config_service_1.EnvironmentConfigService,
        usecases_proxy_1.UseCaseProxy,
        logger_service_1.LoggerService,
        exceptions_service_1.ExceptionsService])
], JwtRefreshTokenStrategy);
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy;
//# sourceMappingURL=jwtRefresh.strategy.js.map