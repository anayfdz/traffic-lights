import { Module } from '@nestjs/common';
import { UserModule } from 'src/infrastructure/repositories/users/user.module';
import { RegisterUserUseCase } from './register-user.usecases';
import { ValidateEmailUsecases } from './validate-email.usecases';

@Module({
  imports: [UserModule],
  providers: [RegisterUserUseCase, ValidateEmailUsecases],
  exports: [RegisterUserUseCase, ValidateEmailUsecases],
})
export class UserCasesModule {}
