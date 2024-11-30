import { UserRepository } from "src/domain/repositories/users/userRepository.interface";
import { ValidateEmailDto } from "src/infrastructure/common/dto/user/validate-email.dto";

export class ValidateEmailUsecases {
    constructor(private readonly userRepository: UserRepository) {

    }
    async execute(validateEmailDto: ValidateEmailDto): Promise<boolean> {
        const isValid = await this.userRepository.validateEmailWithOtp({email: validateEmailDto.email, otp_code: validateEmailDto.otp_code})
         if (!isValid) { throw new Error('Invalid OTP');
    }
    return isValid;
    }
}