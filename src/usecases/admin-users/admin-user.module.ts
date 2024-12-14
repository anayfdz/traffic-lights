import { Module } from '@nestjs/common';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { AdminModule } from 'src/infrastructure/repositories/admin-users/admin.module';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';
import { LoginAdminUseCases } from './login-admin.usecases';
import { JwtConfigModule } from 'src/infrastructure/services/jwt/jwt.module';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { BcryptModule } from 'src/infrastructure/services/bcrypt/bcrypt.module';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';

@Module({
  imports: [JwtConfigModule, AdminModule, BcryptModule, LoggerModule],
  providers: [LoginAdminUseCases, JwtTokenService],
  exports: [LoginAdminUseCases],
})
export class AdminUserModule {}
