"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCasesModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("../../infrastructure/repositories/users/user.module");
const register_user_usecases_1 = require("./register-user.usecases");
const validate_email_usecases_1 = require("./validate-email.usecases");
let UserCasesModule = class UserCasesModule {
};
UserCasesModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule],
        providers: [register_user_usecases_1.RegisterUserUseCase, validate_email_usecases_1.ValidateEmailUsecases],
        exports: [register_user_usecases_1.RegisterUserUseCase, validate_email_usecases_1.ValidateEmailUsecases],
    })
], UserCasesModule);
exports.UserCasesModule = UserCasesModule;
//# sourceMappingURL=user-cases.module.js.map