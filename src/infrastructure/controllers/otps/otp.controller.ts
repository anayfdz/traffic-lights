import { Controller, Post, Body, Param } from '@nestjs/common';
import { OtpService } from '../../repositories/otps/otp.repository';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('otps')
@Controller('otps')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('resend')
  @ApiOperation({ summary: 'Regenerar OTP para un usuario', description: 'Este endpoint permite a un usuario regenerar un código OTP.' })
  @ApiBody({
    description: 'ID del usuario para el cual se generará un nuevo OTP',
    type: Object,
  })
  @ApiResponse({
    status: 200,
    description: 'OTP generado exitosamente y enviado al usuario',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta, falta el userId o datos inválidos',
  })
  async resendOtp(@Body() body: { userId: number}) {
    return this.otpService.generateOtp(body.userId);
  }
}
