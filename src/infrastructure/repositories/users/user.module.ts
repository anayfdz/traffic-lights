import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/usecases/otps/mail.module';
import { User } from 'src/infrastructure/entities/users/user.entity';
import { Otp } from 'src/infrastructure/entities/otps/otps.entity';
import { DatabaseUserRepository } from './user.repository';
import { OtpModule } from '../otps/otp.module';
import { BcryptModule } from 'src/infrastructure/services/bcrypt/bcrypt.module';
import { ExternalService } from './external-service/external.service';

@Module({
imports: [ TypeOrmModule.forFeature([Otp, User]), MailModule,OtpModule, BcryptModule, HttpModule ],
  providers: [DatabaseUserRepository, ExternalService],
  exports: [DatabaseUserRepository, ExternalService],
})
export class UserModule {}
