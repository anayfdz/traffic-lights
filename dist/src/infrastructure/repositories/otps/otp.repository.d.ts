import { Repository } from 'typeorm';
import { Otp } from '../../entities/otps/otps.entity';
import { User } from '../../entities/users/user.entity';
import { MailService } from 'src/usecases/otps/mail-service';
export declare class OtpService {
    private readonly otpRepository;
    private readonly userRepository;
    private readonly mailService;
    constructor(otpRepository: Repository<Otp>, userRepository: Repository<User>, mailService: MailService);
    generateOtp(userId: number): Promise<Otp>;
    verifyOtp(userId: number, otpCode: string): Promise<boolean>;
    sendOtpByEmail(email: string, otp: string): Promise<void>;
}
