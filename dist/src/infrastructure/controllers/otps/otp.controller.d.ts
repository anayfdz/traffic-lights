import { OtpService } from '../../repositories/otps/otp.repository';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    resendOtp(body: {
        userId: number;
    }): Promise<import("../../entities/otps/otps.entity").Otp>;
}
