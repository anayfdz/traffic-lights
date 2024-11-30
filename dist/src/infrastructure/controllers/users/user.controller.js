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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../repositories/users/user.repository");
const create_user_dto_1 = require("../../common/dto/user/create-user.dto");
const validate_email_dto_1 = require("../../common/dto/user/validate-email.dto");
const login_dto_1 = require("../../common/dto/auth/login.dto");
const register_user_usecases_1 = require("../../../usecases/user/register-user.usecases");
const validate_email_usecases_1 = require("../../../usecases/user/validate-email.usecases");
let UserController = class UserController {
    constructor(userService, registerUserUseCase, validateEmailUseCase) {
        this.userService = userService;
        this.registerUserUseCase = registerUserUseCase;
        this.validateEmailUseCase = validateEmailUseCase;
    }
    async registerUser(createUserDto) {
        return this.registerUserUseCase.execute(createUserDto);
    }
    async validateEmail(validateEmailDto) {
        return this.validateEmailUseCase.execute(validateEmailDto);
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('validate-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_email_dto_1.ValidateEmailDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateEmail", null);
UserController = __decorate([
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [user_repository_1.DatabaseUserRepository, register_user_usecases_1.RegisterUserUseCase, validate_email_usecases_1.ValidateEmailUsecases])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map