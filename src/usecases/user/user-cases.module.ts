import { HttpModule, Module } from '@nestjs/common';
//import { UserModule } from 'src/infrastructure/repositories/users/user.module';
import { UserModule } from '../../infrastructure/repositories/users/user.module';

import { ValidateEmailUsecases } from './validate-email.usecases';
//import { ExternalService } from 'src/infrastructure/repositories/users/external-service/external.service';
import { ExternalService } from '../../infrastructure/repositories/users/external-service/external.service';
import { FindUserUseCase } from './find-users.usecases';
//import { UpdateUserUseCase } from './update-user.usecases';
//import { DeleteUserUseCase } from './delete-user.usecases';


@Module({
  imports: [UserModule, HttpModule],
  providers: [ExternalService, ValidateEmailUsecases, FindUserUseCase],
  exports: [ExternalService, ValidateEmailUsecases, FindUserUseCase],
})
export class UserCasesModule {}
