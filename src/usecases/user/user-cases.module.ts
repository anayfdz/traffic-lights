import { HttpModule, Module } from '@nestjs/common';
//import { UserModule } from 'src/infrastructure/repositories/users/user.module';
import { UserModule } from '../../infrastructure/repositories/users/user.module';

import { ValidateEmailUsecases } from './validate-email.usecases';
//import { ExternalService } from 'src/infrastructure/repositories/users/external-service/external.service';
import { ExternalService } from '../../infrastructure/repositories/users/external-service/external.service';


@Module({
  imports: [UserModule, HttpModule],
  providers: [ExternalService, ValidateEmailUsecases],
  exports: [ExternalService, ValidateEmailUsecases],
})
export class UserCasesModule {}
