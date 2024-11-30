import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from '../../entities/otps/otps.entity';
import { User } from '../../entities/users/user.entity';
import * as crypto from 'crypto';
import { NotFoundException } from '@nestjs/common';
import { MailService } from 'src/usecases/otps/mail-service';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService
  ) {}

  // Método para generar un OTP y asociarlo con un usuario
  async generateOtp(userId: number): Promise<Otp> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generamos un código OTP aleatorio de 6 dígitos
    const otpCode = crypto.randomBytes(3).toString('hex');

    // Definimos la fecha de expiración (1 hora a partir de ahora)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);  // Expira en 1 hora

    // Creamos el OTP en la base de datos
    const otp = this.otpRepository.create({
      user,
      otp_code: otpCode,
      expires_at: expiresAt,
    });

    await this.otpRepository.save(otp);
    return otp;
  }

  // Método para verificar un OTP
  async verifyOtp(userId: number, otpCode: string): Promise<boolean> {
    const otp = await this.otpRepository.findOne({
      where: { user: { id: userId }, otp_code: otpCode },
    });

    if (!otp) {
      throw new NotFoundException('Invalid OTP');
    }

    if (new Date() > otp.expires_at) {
      throw new NotFoundException('OTP has expired');
    }

    return true;  // OTP es válido y no ha expirado
  }
async sendOtpByEmail(email: string, otp: string): Promise<void> { 
  const subject = 'Your OTP Code'; 
  const message = `Your OTP code is ${otp}`; 
  await this.mailService.sendMail(email, subject, message);
}
}
