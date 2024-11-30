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
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const usecases_proxy_module_1 = require("../../usecases-proxy/usecases-proxy.module");
const usecases_proxy_1 = require("../../usecases-proxy/usecases-proxy");
const exceptions_service_1 = require("../../exceptions/exceptions.service");
const logger_service_1 = require("../../logger/logger.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(loginUsecaseProxy, logger, exceptionService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    var _a;
                    return (_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.Authentication;
                },
            ]),
            secretOrKey: process.env.JWT_SECRET,
        });
        this.loginUsecaseProxy = loginUsecaseProxy;
        this.logger = logger;
        this.exceptionService = exceptionService;
    }
    async validate(payload) {
        const user = this.loginUsecaseProxy.getInstance().validateUserForJWTStragtegy(payload.username);
        if (!user) {
            this.logger.warn('JwtStrategy', `User not found`);
            this.exceptionService.UnauthorizedException({ message: 'User not found' });
        }
        return user;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.LOGIN_USECASES_PROXY)),
    __metadata("design:paramtypes", [usecases_proxy_1.UseCaseProxy,
        logger_service_1.LoggerService,
        exceptions_service_1.ExceptionsService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map