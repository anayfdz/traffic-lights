import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { LoggerService } from '../../logger/logger.service';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { TokenPayload } from '../../../domain/model/auth/auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    if (!email || !password) {
      this.logger.warn('LocalStrategy', 'Email or password is missing.');
      throw new Error('Email or password is missing.');
    }

    try {
      const user = await this.loginUsecaseProxy.getInstance().validateUserForLocalStragtegy(email, password);
      console.log('LocalStrategy: Buscando usuario con email:', user);
      if (!user) {
        this.logger.warn('LocalStrategy', 'Invalid email or password.');
        throw new Error('Invalid email or password.');
      }

      this.logger.log('LocalStrategy', `User ${email} validated successfully.`);
      return user;
    } catch (error) {
      this.logger.error('LocalStrategy', error.message);
      throw new Error(error.message);
    }
  }
}
