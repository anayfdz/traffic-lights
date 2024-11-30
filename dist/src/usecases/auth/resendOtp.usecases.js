"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendOtpUsecases = void 0;
const userRepository_interface_1 = require("../../domain/repositories/users/userRepository.interface");
const resend_otp_dto_1 = require("../../infrastructure/common/dto/user/resend-otp.dto");
const validate_email_dto_1 = require("../../infrastructure/common/dto/user/validate-email.dto");
class ResendOtpUsecases {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(resendOtpDto) {
        const isValid = await this.userRepository.getUserByUsername(resendOtpDto.email);
        if (!isValid) {
            throw new Error('Invalid OTP');
        }
        return true;
    }
}
exports.ResendOtpUsecases = ResendOtpUsecases;
//# sourceMappingURL=resendOtp.usecases.js.map