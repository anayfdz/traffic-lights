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
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
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
    console.log('Payload recibido:', payload);
    if (!payload) {
      this.logger.warn('LocalStrategy', `Token inválido, no se encuentra el payload`);
      this.exceptionService.UnauthorizedException({ message: 'invalid token' });
    } 

    const user = await this.loginUsecaseProxy.getInstance().validateUserForJWTStragtegy(payload.email, payload.sub);
    if (!user) {
      this.logger.warn('JwtStrategy', `Usuario no encontrado: ${payload.email}`);
      this.exceptionService.UnauthorizedException({ message: 'Usuario no encontrado o token inválido' });
    }
    console.log('Usuario autenticado', user);
    return user;
  }
}
