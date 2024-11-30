"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateEmailUsecases = void 0;
const userRepository_interface_1 = require("../../domain/repositories/users/userRepository.interface");
const validate_email_dto_1 = require("../../infrastructure/common/dto/user/validate-email.dto");
class ValidateEmailUsecases {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(validateEmailDto) {
        const isValid = await this.userRepository.validateEmailWithOtp({ email: validateEmailDto.email, otp_code: validateEmailDto.otp_code });
        if (!isValid) {
            throw new Error('Invalid OTP');
        }
        return isValid;
    }
}
exports.ValidateEmailUsecases = ValidateEmailUsecases;
//# sourceMappingURL=validate-email.usecases.js.map