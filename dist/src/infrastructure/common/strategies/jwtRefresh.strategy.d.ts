/// <reference types="cookie-parser" />
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { TokenPayload } from '../../../domain/model/auth/auth';
import { LoggerService } from '../../logger/logger.service';
import { ExceptionsService } from '../../exceptions/exceptions.service';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly configService;
    private readonly loginUsecaseProxy;
    private readonly logger;
    private readonly exceptionService;
    constructor(configService: EnvironmentConfigService, loginUsecaseProxy: UseCaseProxy<LoginUseCases>, logger: LoggerService, exceptionService: ExceptionsService);
    validate(request: Request, payload: TokenPayload): Promise<import("../../../domain/model/users/user").UserM>;
}
export {};
