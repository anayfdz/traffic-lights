"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllersModule = void 0;
const common_1 = require("@nestjs/common");
const usecases_proxy_module_1 = require("../usecases-proxy/usecases-proxy.module");
const auth_controller_1 = require("./auth/auth.controller");
const otp_controller_1 = require("./otps/otp.controller");
const user_controller_1 = require("./users/user.controller");
const otp_module_1 = require("../repositories/otps/otp.module");
const user_module_1 = require("../repositories/users/user.module");
const user_cases_module_1 = require("../../usecases/user/user-cases.module");
let ControllersModule = class ControllersModule {
};
ControllersModule = __decorate([
    (0, common_1.Module)({
        imports: [usecases_proxy_module_1.UsecasesProxyModule.register(), otp_module_1.OtpModule, user_module_1.UserModule, user_cases_module_1.UserCasesModule],
        controllers: [auth_controller_1.AuthController, otp_controller_1.OtpController, user_controller_1.UserController],
    })
], ControllersModule);
exports.ControllersModule = ControllersModule;
//# sourceMappingURL=controllers.module.js.map