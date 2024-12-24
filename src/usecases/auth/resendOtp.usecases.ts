//import { UserRepository } from 'src/domain/repositories/users/userRepository.interface';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/users/user.repository';
import { UserRepository } from '../../domain/repositories/users/userRepository.interface';
//import { ResendOtpDto } from 'src/infrastructure/common/dto/user/resend-otp.dto';
import { ResendOtpDto } from '../../infrastructure/common/dto/user/resend-otp.dto';


export class ResendOtpUsecases {
  constructor(private readonly userRepository: DatabaseUserRepository) {}
  async execute(email: string): Promise<any> {
    const isValid = await this.userRepository.getUserByEmail(email);
    if (!isValid) {
      throw new Error('Invalid OTP');
    }
    await this.userRepository.resendOtp(email);
}
}
