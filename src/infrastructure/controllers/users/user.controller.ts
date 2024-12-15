import { Controller, Post, Body, Param, Request, Inject, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from '../../common/dto/user/create-user.dto';
import { ValidateEmailDto } from '../../common/dto/user/validate-email.dto';
import { RegisterUserUseCase } from 'src/usecases/user/register-user.usecases';
import { ValidateEmailUsecases } from 'src/usecases/user/validate-email.usecases';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { FindReportsUserUseCase } from 'src/usecases/user/find-reports-authenticate-user.usecases';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';


interface ResponseValidEmail {
  message: string
}


@Controller('api/users')
export class UserController {
  constructor(@Inject(UsecasesProxyModule.REGISTER_USECASES_PROXY)
  private readonly registerUserUseCase: UseCaseProxy<RegisterUserUseCase>, 
  @Inject(UsecasesProxyModule.VALIDATE_USECASES_EMAIL_PROXY)
  private readonly validateEmailUseCase: UseCaseProxy<ValidateEmailUsecases>,
  @Inject(UsecasesProxyModule.FIND_REPORTS_USERS_USECASES_PROXY)
  private readonly findReportsUserUseCase: UseCaseProxy<FindReportsUserUseCase>
) { }
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const registerUseCase = this.registerUserUseCase.getInstance();
    const user = await registerUseCase.execute(createUserDto);
    return { message: 'Usuario registrado con éxito.Se ha enviado un OTP a tu correo electrónico.'}
  }

  @Post('validate-email')
  async validateEmail(@Body() validateEmailDto: ValidateEmailDto): Promise<ResponseValidEmail> {
    const validate = this.validateEmailUseCase.getInstance();
    const isValid = validate.execute(validateEmailDto);
    if (!isValid) {
      throw new Error('Invalid Otp')
    }
    return {message: 'Correo electrónico validado con éxito.'}
  }

  @Get('reports')
  @UseGuards(JwtAuthGuard)
  async getUserReports(@Request() req) {
    const userId = req.user.sub;
    return await this.findReportsUserUseCase.getInstance().execute(userId);
  }
    // @Post('logout') async logout() { 
    //   return this.userService.logout(); 
    // }
}
