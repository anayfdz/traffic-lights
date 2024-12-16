import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { LoggerService } from '../../logger/logger.service';
import { LoginAdminUseCases } from '../../../usecases/admin-users/login-admin.usecases';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    @Inject(UsecasesProxyModule.AdminUserUseCasesProxy)
    private readonly LoginAdminUseCases: UseCaseProxy<LoginAdminUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: (request: Request) => {
        return request?.headers?.authorization?.split(' ')[1];
      },
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (!payload) {
      this.logger.warn('AdminJwtStrategy', `Token inválido, no se encuentra el payload`);
      this.exceptionService.UnauthorizedException({ message: 'invalid token' });
    } 

    if (payload.role !== 'admin') {
      this.logger.warn('AdminJwtStrategy', `Usuario no encontrado o no es admin: ${payload.role}`);
      this.exceptionService.UnauthorizedException({ message: 'Token no autorizado para admin' });
    }
      try {
        const email = payload.email;
        const adminId = Number(payload.sub);
        const admin = await this.LoginAdminUseCases.getInstance().validateUserForJWTStragtegy(email, adminId);
        if (!admin) {
          this.logger.warn('JwtStrategy', `Usuario no encontrado: ${payload.email}`);
          this.exceptionService.UnauthorizedException({ message: 'Invalid token or user not found.' });
        } 
        return admin;
      } catch (error) {
        this.logger.error('Jwt Strategy', `Error al validar admin: ${error.message}`);
        throw error;
      }
    }
}
