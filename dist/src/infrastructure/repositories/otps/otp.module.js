"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModule = void 0;
const common_1 = require("@nestjs/common");
const otp_repository_1 = require("./otp.repository");
const typeorm_1 = require("@nestjs/typeorm");
const mail_module_1 = require("../../../usecases/otps/mail.module");
const user_entity_1 = require("../../entities/users/user.entity");
const otps_entity_1 = require("../../entities/otps/otps.entity");
let OtpModule = class OtpModule {
};
OtpModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([otps_entity_1.Otp, user_entity_1.User]), mail_module_1.MailModule,],
        providers: [otp_repository_1.OtpService],
        exports: [otp_repository_1.OtpService],
    })
], OtpModule);
exports.OtpModule = OtpModule;
//# sourceMappingURL=otp.module.js.map