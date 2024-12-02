import { Controller, Post, Body, Param, Inject } from '@nestjs/common';
import { DatabaseUserRepository } from '../../repositories/users/user.repository';
//import { User } from '../../entities/users/user.entity';
import { CreateUserDto } from '../../common/dto/user/create-user.dto';
import { ValidateEmailDto } from '../../common/dto/user/validate-email.dto';
import { ResendOtpDto } from '../../common/dto/user/resend-otp.dto';
import { UserM } from '../../../domain/model/users/user';
import { LoginDto } from 'src/infrastructure/common/dto/auth/login.dto';
import { RegisterUserUseCase } from 'src/usecases/user/register-user.usecases';
import { ValidateEmailUsecases } from 'src/usecases/user/validate-email.usecases';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';

@Controller('api/users')
export class UserController {
  constructor(@Inject(UsecasesProxyModule.REGISTER_USECASES_PROXY)
  private readonly registerUserUseCase: UseCaseProxy<RegisterUserUseCase>, 
  @Inject(UsecasesProxyModule.VALIDATE_USECASES_EMAIL_PROXY)
  private readonly validateEmailUseCase: UseCaseProxy<ValidateEmailUsecases>) { }
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const registerUseCase = this.registerUserUseCase.getInstance();
    const user = await registerUseCase.execute(createUserDto);
    return { message: 'Usuario registrado con éxito.Se ha enviado un OTP a tu correo electrónico.'}
  }

  @Post('validate-email')
  async validateEmail(@Body() validateEmailDto: ValidateEmailDto): Promise<boolean> {
    const validate = this.validateEmailUseCase.getInstance();
    return validate.execute(validateEmailDto);
  }

  // @Post('login') 
  // async login(@Body() loginDto: LoginDto) { 
  //   return this.userService.login(loginDto); 
  // } 
  //   @Post('logout') async logout() { 
  //     return this.userService.logout(); 
  //   }
}
