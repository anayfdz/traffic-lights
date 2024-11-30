import { DynamicModule } from '@nestjs/common';
export declare class UsecasesProxyModule {
    static LOGIN_USECASES_PROXY: string;
    static IS_AUTHENTICATED_USECASES_PROXY: string;
    static LOGOUT_USECASES_PROXY: string;
    static RESEND_USECASES_PROXY: string;
    static MAIL_SERVICE: string;
    static register(): DynamicModule;
}
