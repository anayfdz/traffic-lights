import { Module } from '@nestjs/common';
import { OtpService } from './otp.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { MailModule } from 'src/usecases/otps/mail.module';
import { MailModule } from '../../../usecases/otps/mail.module';
//import { User } from 'src/infrastructure/entities/users/user.entity';
import { User } from '../../../infrastructure/entities/users/user.entity';
//import { Otp } from 'src/infrastructure/entities/otps/otps.entity';
import { Otp } from '../../../infrastructure/entities/otps/otps.entity';


@Module({
    imports: [ TypeOrmModule.forFeature([Otp, User]), MailModule, ],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
