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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const otps_entity_1 = require("../../entities/otps/otps.entity");
const user_entity_1 = require("../../entities/users/user.entity");
const crypto = require("crypto");
const common_2 = require("@nestjs/common");
const mail_service_1 = require("../../../usecases/otps/mail-service");
let OtpService = class OtpService {
    constructor(otpRepository, userRepository, mailService) {
        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }
    async generateOtp(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_2.NotFoundException('User not found');
        }
        const otpCode = crypto.randomBytes(3).toString('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        const otp = this.otpRepository.create({
            user,
            otp_code: otpCode,
            expires_at: expiresAt,
        });
        await this.otpRepository.save(otp);
        return otp;
    }
    async verifyOtp(userId, otpCode) {
        const otp = await this.otpRepository.findOne({
            where: { user: { id: userId }, otp_code: otpCode },
        });
        if (!otp) {
            throw new common_2.NotFoundException('Invalid OTP');
        }
        if (new Date() > otp.expires_at) {
            throw new common_2.NotFoundException('OTP has expired');
        }
        return true;
    }
    async sendOtpByEmail(email, otp) {
        const subject = 'Your OTP Code';
        const message = `Your OTP code is ${otp}`;
        await this.mailService.sendMail(email, subject, message);
    }
};
OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(otps_entity_1.Otp)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.repository.js.map