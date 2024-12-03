import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/users/user.entity';
import { DatabaseUserRepository } from './users/user.repository';
import { OtpService} from './otps/otp.repository'
import { Otp } from '../entities/otps/otps.entity';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { MailModule } from 'src/usecases/otps/mail.module';
import { JwtConfigModule } from '../services/jwt/jwt.module';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User, Otp]), MailModule, BcryptModule, JwtConfigModule],
  providers: [DatabaseUserRepository, OtpService],
  exports: [DatabaseUserRepository, OtpService],
})
export class RepositoriesModule {}
