import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { OtpController } from './otps/otp.controller';
//import { TrafficLightController } from './traffic-lights/traffic-light.controller';
import { UserController } from './users/user.controller';
import { OtpModule } from '../repositories/otps/otp.module';
import { UserModule } from '../repositories/users/user.module';
import { UserCasesModule } from 'src/usecases/user/user-cases.module';

@Module({
  imports: [UsecasesProxyModule.register(), OtpModule, UserModule, UserCasesModule],
  controllers: [AuthController, OtpController, UserController],
})
export class ControllersModule {}
