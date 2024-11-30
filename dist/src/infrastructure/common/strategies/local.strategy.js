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
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const usecases_proxy_module_1 = require("../../usecases-proxy/usecases-proxy.module");
const usecases_proxy_1 = require("../../usecases-proxy/usecases-proxy");
const logger_service_1 = require("../../logger/logger.service");
const exceptions_service_1 = require("../../exceptions/exceptions.service");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(loginUsecaseProxy, logger, exceptionService) {
        super();
        this.loginUsecaseProxy = loginUsecaseProxy;
        this.logger = logger;
        this.exceptionService = exceptionService;
    }
    async validate(username, password) {
        if (!username || !password) {
            this.logger.warn('LocalStrategy', `Username or password is missing, BadRequestException`);
            this.exceptionService.UnauthorizedException();
        }
        const user = await this.loginUsecaseProxy.getInstance().validateUserForLocalStragtegy(username, password);
        if (!user) {
            this.logger.warn('LocalStrategy', `Invalid username or password`);
            this.exceptionService.UnauthorizedException({ message: 'Invalid username or password.' });
        }
        return user;
    }
};
LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.LOGIN_USECASES_PROXY)),
    __metadata("design:paramtypes", [usecases_proxy_1.UseCaseProxy,
        logger_service_1.LoggerService,
        exceptions_service_1.ExceptionsService])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map