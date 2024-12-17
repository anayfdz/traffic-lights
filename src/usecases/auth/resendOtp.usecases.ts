//import { UserRepository } from 'src/domain/repositories/users/userRepository.interface';
import { UserRepository } from '../../domain/repositories/users/userRepository.interface';
//import { ResendOtpDto } from 'src/infrastructure/common/dto/user/resend-otp.dto';
import { ResendOtpDto } from '../../infrastructure/common/dto/user/resend-otp.dto';


export class ResendOtpUsecases {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(resendOtpDto: ResendOtpDto): Promise<boolean> {
    const isValid = await this.userRepository.getUserByUsername(resendOtpDto.email);
    if (!isValid) {
      throw new Error('Invalid OTP');
    }
    return true;
}
}
