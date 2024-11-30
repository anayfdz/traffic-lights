import { Controller, Post, Body, Param } from '@nestjs/common';
import { DatabaseUserRepository } from '../../repositories/users/user.repository';
//import { User } from '../../entities/users/user.entity';
import { CreateUserDto } from '../../common/dto/user/create-user.dto';
import { ValidateEmailDto } from '../../common/dto/user/validate-email.dto';
import { ResendOtpDto } from '../../common/dto/user/resend-otp.dto';
import { UserM } from '../../../domain/model/users/user';
import { LoginDto } from 'src/infrastructure/common/dto/auth/login.dto';
import { RegisterUserUseCase } from 'src/usecases/user/register-user.usecases';
import { ValidateEmailUsecases } from 'src/usecases/user/validate-email.usecases';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: DatabaseUserRepository, private readonly registerUserUseCase: RegisterUserUseCase, private readonly validateEmailUseCase: ValidateEmailUsecases) {}
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<UserM> {
    return this.registerUserUseCase.execute(createUserDto);
  }
 
  @Post('validate-email')
  async validateEmail(@Body() validateEmailDto: ValidateEmailDto): Promise<boolean> {
    return this.validateEmailUseCase.execute(validateEmailDto);
  }
   
    // @Post('login') 
    // async login(@Body() loginDto: LoginDto) { 
    //   return this.userService.login(loginDto); 
    // } 
    //   @Post('logout') async logout() { 
    //     return this.userService.logout(); 
    //   }
}
