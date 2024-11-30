"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UsecasesProxyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsecasesProxyModule = void 0;
const common_1 = require("@nestjs/common");
const isAuthenticated_usecases_1 = require("../../usecases/auth/isAuthenticated.usecases");
const login_usecases_1 = require("../../usecases/auth/login.usecases");
const logout_usecases_1 = require("../../usecases/auth/logout.usecases");
const exceptions_module_1 = require("../exceptions/exceptions.module");
const logger_module_1 = require("../logger/logger.module");
const logger_service_1 = require("../logger/logger.service");
const bcrypt_module_1 = require("../services/bcrypt/bcrypt.module");
const bcrypt_service_1 = require("../services/bcrypt/bcrypt.service");
const jwt_module_1 = require("../services/jwt/jwt.module");
const jwt_service_1 = require("../services/jwt/jwt.service");
const repositories_module_1 = require("../repositories/repositories.module");
const user_repository_1 = require("../repositories/users/user.repository");
const otp_repository_1 = require("../repositories/otps/otp.repository");
const environment_config_module_1 = require("../config/environment-config/environment-config.module");
const environment_config_service_1 = require("../config/environment-config/environment-config.service");
const usecases_proxy_1 = require("./usecases-proxy");
const mail_module_1 = require("../../usecases/otps/mail.module");
let UsecasesProxyModule = UsecasesProxyModule_1 = class UsecasesProxyModule {
    static register() {
        return {
            module: UsecasesProxyModule_1,
            providers: [
                {
                    inject: [logger_service_1.LoggerService, jwt_service_1.JwtTokenService, environment_config_service_1.EnvironmentConfigService, user_repository_1.DatabaseUserRepository, otp_repository_1.OtpService, bcrypt_service_1.BcryptService],
                    provide: UsecasesProxyModule_1.LOGIN_USECASES_PROXY,
                    useFactory: (logger, jwtTokenService, config, userRepo, otpRepo, bcryptService) => new usecases_proxy_1.UseCaseProxy(new login_usecases_1.LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
                },
                {
                    inject: [user_repository_1.DatabaseUserRepository],
                    provide: UsecasesProxyModule_1.IS_AUTHENTICATED_USECASES_PROXY,
                    useFactory: (userRepo) => new usecases_proxy_1.UseCaseProxy(new isAuthenticated_usecases_1.IsAuthenticatedUseCases(userRepo)),
                },
                {
                    inject: [],
                    provide: UsecasesProxyModule_1.LOGOUT_USECASES_PROXY,
                    useFactory: () => new usecases_proxy_1.UseCaseProxy(new logout_usecases_1.LogoutUseCases()),
                },
                {
                    inject: [],
                    provide: UsecasesProxyModule_1.RESEND_USECASES_PROXY,
                    useFactory: () => new usecases_proxy_1.UseCaseProxy(new logout_usecases_1.LogoutUseCases()),
                },
                {
                    inject: [otp_repository_1.OtpService],
                    provide: UsecasesProxyModule_1.MAIL_SERVICE,
                    useFactory: () => new usecases_proxy_1.UseCaseProxy(new mail_module_1.MailModule()),
                },
            ],
            exports: [
                UsecasesProxyModule_1.RESEND_USECASES_PROXY,
                UsecasesProxyModule_1.LOGIN_USECASES_PROXY,
                UsecasesProxyModule_1.IS_AUTHENTICATED_USECASES_PROXY,
                UsecasesProxyModule_1.LOGOUT_USECASES_PROXY,
                UsecasesProxyModule_1.MAIL_SERVICE,
            ],
        };
    }
};
UsecasesProxyModule.LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
UsecasesProxyModule.LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
UsecasesProxyModule.RESEND_USECASES_PROXY = 'ResendOtpUsecasesProxy';
UsecasesProxyModule.MAIL_SERVICE = 'MailModule';
UsecasesProxyModule = UsecasesProxyModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [logger_module_1.LoggerModule, jwt_module_1.JwtModule, bcrypt_module_1.BcryptModule, mail_module_1.MailModule, environment_config_module_1.EnvironmentConfigModule, repositories_module_1.RepositoriesModule, exceptions_module_1.ExceptionsModule],
    })
], UsecasesProxyModule);
exports.UsecasesProxyModule = UsecasesProxyModule;
//# sourceMappingURL=usecases-proxy.module.js.map