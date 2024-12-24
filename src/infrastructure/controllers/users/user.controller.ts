import { Controller, Post, Body, Param, Request, Inject, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from '../../common/dto/user/create-user.dto';
import { ValidateEmailDto } from '../../common/dto/user/validate-email.dto';
//import { RegisterUserUseCase } from 'src/usecases/user/register-user.usecases';
import { RegisterUserUseCase } from '../../../usecases/user/register-user.usecases';
//import { ValidateEmailUsecases } from 'src/usecases/user/validate-email.usecases';
import { ValidateEmailUsecases } from '../../../usecases/user/validate-email.usecases';
//import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
//import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
//import { FindReportsUserUseCase } from 'src/usecases/user/find-reports-authenticate-user.usecases';
import { FindReportsUserUseCase } from '../../../usecases/user/find-reports-authenticate-user.usecases';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


interface ResponseValidEmail {
  message: string
}

@ApiTags('users')
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
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado con éxito',
  })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  async registerUser(@Body() createUser: any) {
    const registerUseCase = this.registerUserUseCase.getInstance();
    const user = await registerUseCase.execute(createUser);
    return { message: 'Usuario registrado con éxito.Se ha enviado un OTP a tu correo electrónico.'}
  }

  @Post('validate-email')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Validar el correo electrónico con OTP' })
  @ApiBody({ type: ValidateEmailDto })
  @ApiResponse({
    status: 200,
    description: 'Correo electrónico validado con éxito',
  })
  @ApiResponse({ status: 400, description: 'OTP inválido' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener los informes del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Informes obtenidos con éxito',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getUserReports(@Request() req) {
    const userId = req.user.sub;
    return await this.findReportsUserUseCase.getInstance().execute(userId);
  }
}
