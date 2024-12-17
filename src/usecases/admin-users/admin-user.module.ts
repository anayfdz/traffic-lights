import { Module } from '@nestjs/common';
//import { AdminModule } from 'src/infrastructure/repositories/admin-users/admin.module';
import { AdminModule } from '../../infrastructure/repositories/admin-users/admin.module';
//import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';
import { JwtTokenService } from '../../infrastructure/services/jwt/jwt.service';
import { LoginAdminUseCases } from './login-admin.usecases';
//import { JwtConfigModule } from 'src/infrastructure/services/jwt/jwt.module';
import { JwtConfigModule } from '../../infrastructure/services/jwt/jwt.module';
//import { BcryptModule } from 'src/infrastructure/services/bcrypt/bcrypt.module';
import { BcryptModule } from '../../infrastructure/services/bcrypt/bcrypt.module';
//import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { LoggerModule } from '../../infrastructure/logger/logger.module';


@Module({
  imports: [JwtConfigModule, AdminModule, BcryptModule, LoggerModule],
  providers: [LoginAdminUseCases, JwtTokenService],
  exports: [LoginAdminUseCases],
})
export class AdminUserModule {}
