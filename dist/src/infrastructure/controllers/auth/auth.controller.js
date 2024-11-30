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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_dto_class_1 = require("./auth-dto.class");
const auth_presenter_1 = require("./auth.presenter");
const jwtRefresh_guard_1 = require("../../common/guards/jwtRefresh.guard");
const jwtAuth_guard_1 = require("../../common/guards/jwtAuth.guard");
const login_guard_1 = require("../../common/guards/login.guard");
const usecases_proxy_1 = require("../../usecases-proxy/usecases-proxy");
const usecases_proxy_module_1 = require("../../usecases-proxy/usecases-proxy.module");
const response_decorator_1 = require("../../common/swagger/response.decorator");
const resend_otp_dto_1 = require("../otps/resend-otp.dto");
let AuthController = class AuthController {
    constructor(loginUsecaseProxy, logoutUsecaseProxy, isAuthUsecaseProxy, resendUsecaseProxy) {
        this.loginUsecaseProxy = loginUsecaseProxy;
        this.logoutUsecaseProxy = logoutUsecaseProxy;
        this.isAuthUsecaseProxy = isAuthUsecaseProxy;
        this.resendUsecaseProxy = resendUsecaseProxy;
    }
    async login(auth, request) {
        const accessTokenCookie = await this.loginUsecaseProxy.getInstance().getCookieWithJwtToken(auth.username);
        const refreshTokenCookie = await this.loginUsecaseProxy.getInstance().getCookieWithJwtRefreshToken(auth.username);
        request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
        return 'Login successful';
    }
    async logout(request) {
        const cookie = await this.logoutUsecaseProxy.getInstance().execute();
        request.res.setHeader('Set-Cookie', cookie);
        return 'Logout successful';
    }
    async resendOtp(resendOtpDto) {
        await this.resendUsecaseProxy.getInstance().execute(resendOtpDto);
    }
    async isAuthenticated(request) {
        const user = await this.isAuthUsecaseProxy.getInstance().execute(request.user.name);
        const response = new auth_presenter_1.IsAuthPresenter();
        response.username = user.name;
        return response;
    }
    async refresh(request) {
        const accessTokenCookie = await this.loginUsecaseProxy.getInstance().getCookieWithJwtToken(request.user.name);
        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return 'Refresh successful';
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: auth_dto_class_1.AuthLoginDto }),
    (0, swagger_1.ApiOperation)({ description: 'login' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_class_1.AuthLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ description: 'logout' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('resend-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_otp_dto_1.ResendOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendOtp", null);
__decorate([
    (0, common_1.Get)('is_authenticated'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ description: 'is_authenticated' }),
    (0, response_decorator_1.ApiResponseType)(auth_presenter_1.IsAuthPresenter, false),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "isAuthenticated", null);
__decorate([
    (0, common_1.Get)('refresh'),
    (0, common_1.UseGuards)(jwtRefresh_guard_1.default),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    (0, common_1.Controller)('api/'),
    (0, swagger_1.ApiTags)('auth'),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'No authorization token was found',
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal error' }),
    (0, swagger_1.ApiExtraModels)(auth_presenter_1.IsAuthPresenter),
    __param(0, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.LOGIN_USECASES_PROXY)),
    __param(1, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.LOGOUT_USECASES_PROXY)),
    __param(2, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)),
    __param(3, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.RESEND_USECASES_PROXY)),
    __metadata("design:paramtypes", [usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map