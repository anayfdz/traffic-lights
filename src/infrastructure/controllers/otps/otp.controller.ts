import { Controller, Post, Body, Param } from '@nestjs/common';
import { OtpService } from '../../repositories/otps/otp.repository';

@Controller('otps')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('resend')
  async resendOtp(@Body() body: { userId: number}) {
    return this.otpService.generateOtp(body.userId);
  }
}
