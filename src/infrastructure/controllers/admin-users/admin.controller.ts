import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { Roles } from "src/infrastructure/common/decorators/roles.decorator";
import { Roles } from '../../../infrastructure/common/decorators/roles.decorator';
//import { LoginAdminDto } from "src/infrastructure/common/dto/admin-user/login-admin.dto";
import { LoginAdminDto } from '../../../infrastructure/common/dto/admin-user/login-admin.dto';
//import { JwtAuthGuard } from "src/infrastructure/common/guards/jwtAuth.guard";
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
//import { RolesGuard } from "src/infrastructure/common/guards/roles.guard";
import { RolesGuard } from '../../common/guards/roles.guard';
//import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
//import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { UsecasesProxyModule } from '.././../usecases-proxy/usecases-proxy.module';
//import { LoginAdminUseCases } from "src/usecases/admin-users/login-admin.usecases";
import { LoginAdminUseCases } from '../../../usecases/admin-users/login-admin.usecases';
//import { Request } from 'express';
import { Request as ExpressRequest } from 'express';
import { JwtAdminAuthGuard } from 'src/infrastructure/common/guards/JwtAuthAdmin.guard';
import { FindUserUseCase } from '../../../usecases/user/Find-users.usecases';
import { UpdateUserUseCase } from '../../../usecases/user/update-user.usecases';
import { DeleteUserUseCase } from '../../../usecases/user/delete-user.usecases';
import { UserM } from 'src/domain/model/users/user';
import { UpdateUserDto } from 'src/infrastructure/common/dto/user/update-user.dto';
@Controller('api/admin')
@ApiTags('admin-auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
export class AdminController {
  constructor(
    @Inject(UsecasesProxyModule.AdminUserUseCasesProxy)
    private readonly adminUsecaseProxy: UseCaseProxy<LoginAdminUseCases>,
    @Inject(UsecasesProxyModule.FindUserUseCaseProxy)
    private readonly findUserUseCaseProxy: UseCaseProxy<FindUserUseCase>,
    @Inject(UsecasesProxyModule.UpdateUserUseCaseProxy)
    private readonly updateUserUseCaseProxy: UseCaseProxy<UpdateUserUseCase>,
    @Inject(UsecasesProxyModule.DeleteUserUseCaseProxy)
    private readonly deleteUserUseCaseProxy: UseCaseProxy<DeleteUserUseCase>,
  ) {}
  @Post('login')
  @ApiBody({ type: LoginAdminDto })
  @ApiOperation({ description: 'Iniciar sesión de un administrador' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async loginAdmin(@Body() loginAdminDto: LoginAdminDto): Promise<{ access_token: string }> {
    const { email, password } = loginAdminDto;
    try {
      const { token } = await this.adminUsecaseProxy.getInstance().loginAdmin(email, password);
      return {
        access_token: token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Cerrar sesión de un administrador' })
  @ApiResponse({
    status: 200,
    description: 'Logout exitoso',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async logout(@Request() request: ExpressRequest) {
    request.res.setHeader('Set-Cookie', 'Authentication=; HttpOnly; Path=/; Max-Age=0;');
    request.res.setHeader('Set-Cookie', 'Refresh=; HttpOnly; Path=/; Max-Age=0;');

    return { message: 'Logout exitoso' };
  }

  @Get()
  @UseGuards(JwtAdminAuthGuard)
  async getAllUsers(): Promise<UserM[]> {
    return await this.findUserUseCaseProxy.getInstance().execute();
  }

  @Put(':id')
  @UseGuards(JwtAdminAuthGuard)
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserM> {
    return await this.updateUserUseCaseProxy.getInstance().execute(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAdminAuthGuard)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.deleteUserUseCaseProxy.getInstance().execute(id);
  }

  // asignar reportes a semaforos especificos
  //     @Put(':id/assign')
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles('admin')
  //   async assignReport(
  //     @Param('id') id: number,
  //     @Body('traffic_light_id') trafficLightId: number
  //   ) {
  //     return await this.trafficLightService.assignReportToTrafficLight(id, trafficLightId);
  //   }

  // marcar reporte como resuelto
  // @Put(':id/resolve')
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles('admin')
  //   async resolveReport(@Param('id') id: number, @Body('status') status: string) {
  //     return await this.trafficLightService.resolveReport(id, status);
  //   }
}
