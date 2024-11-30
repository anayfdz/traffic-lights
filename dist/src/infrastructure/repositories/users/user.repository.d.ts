import { Repository } from 'typeorm';
import { UserM } from '../../../domain/model/users/user';
import { UserRepository } from '../../../domain/repositories/users/userRepository.interface';
import { User } from '../../entities/users/user.entity';
import { OtpService } from '../otps/otp.repository';
import { BcryptService } from '../../../infrastructure/services/bcrypt/bcrypt.service';
import { CreateUserDto } from '../../common/dto/user/create-user.dto';
import { ValidateEmailDto } from 'src/infrastructure/common/dto/user/validate-email.dto';
export declare class DatabaseUserRepository implements UserRepository {
    private readonly userEntityRepository;
    private readonly otpService;
    private readonly bcryptService;
    constructor(userEntityRepository: Repository<User>, otpService: OtpService, bcryptService: BcryptService);
    registerUser(createUserDto: CreateUserDto): Promise<UserM>;
    getUserById(userId: number): Promise<User>;
    resendOtp(email: string): Promise<void>;
    getUserByUsername(username: string): Promise<UserM>;
    getUserByEmail(email: string): Promise<boolean>;
    validateEmailWithOtp(validateEmailDto: ValidateEmailDto): Promise<boolean>;
    private toUser;
    private toReport;
    private toOtp;
    private toEvidence;
}
