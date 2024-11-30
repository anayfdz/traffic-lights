import { UserRepository } from 'src/domain/repositories/users/userRepository.interface';
import { ResendOtpDto } from 'src/infrastructure/common/dto/user/resend-otp.dto';
export declare class ResendOtpUsecases {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(resendOtpDto: ResendOtpDto): Promise<boolean>;
}
