import { AuthLoginDto } from './auth-dto.class';
import { IsAuthPresenter } from './auth.presenter';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import { ResendOtpUsecases } from '../../../usecases/auth/resendOtp.usecases';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';
import { ResendOtpDto } from '../otps/resend-otp.dto';
export declare class AuthController {
    private readonly loginUsecaseProxy;
    private readonly logoutUsecaseProxy;
    private readonly isAuthUsecaseProxy;
    private readonly resendUsecaseProxy;
    constructor(loginUsecaseProxy: UseCaseProxy<LoginUseCases>, logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>, isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>, resendUsecaseProxy: UseCaseProxy<ResendOtpUsecases>);
    login(auth: AuthLoginDto, request: any): Promise<string>;
    logout(request: any): Promise<string>;
    resendOtp(resendOtpDto: ResendOtpDto): Promise<any>;
    isAuthenticated(request: any): Promise<IsAuthPresenter>;
    refresh(request: any): Promise<string>;
}
