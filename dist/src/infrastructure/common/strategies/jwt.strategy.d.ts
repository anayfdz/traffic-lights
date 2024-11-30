import { Strategy } from 'passport-jwt';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { LoggerService } from '../../logger/logger.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly loginUsecaseProxy;
    private readonly logger;
    private readonly exceptionService;
    constructor(loginUsecaseProxy: UseCaseProxy<LoginUseCases>, logger: LoggerService, exceptionService: ExceptionsService);
    validate(payload: any): Promise<import("../../../domain/model/users/user").UserM>;
}
export {};
