import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { MailModule } from 'src/usecases/otps/mail.module';
import { MailModule } from '../../../usecases/otps/mail.module';
//import { User } from 'src/infrastructure/entities/users/user.entity';
import { User } from '../../../infrastructure/entities/users/user.entity';
//import { Otp } from 'src/infrastructure/entities/otps/otps.entity';
import { Otp } from '../../../infrastructure/entities/otps/otps.entity';
import { DatabaseUserRepository } from './user.repository';
import { OtpModule } from '../otps/otp.module';
//import { BcryptModule } from 'src/infrastructure/services/bcrypt/bcrypt.module';
import { BcryptModule } from '../../../infrastructure/services/bcrypt/bcrypt.module';
import { ExternalService } from './external-service/external.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
//import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';
import { JwtTokenService } from '../../../infrastructure/services/jwt/jwt.service';
//import { JwtConfigModule } from 'src/infrastructure/services/jwt/jwt.module';
import { JwtConfigModule } from '../../../infrastructure/services/jwt/jwt.module';
//import { UserRepository} from '../../../domain/repositories/users/userRepository.interface'

@Module({
imports: [ TypeOrmModule.forFeature([Otp, User]), MailModule,OtpModule, BcryptModule, 
HttpModule, 
PassportModule, 
JwtConfigModule,
 ],
  providers: [ DatabaseUserRepository, ExternalService, JwtTokenService],
  exports: [DatabaseUserRepository, ExternalService],
})
export class UserModule {}
