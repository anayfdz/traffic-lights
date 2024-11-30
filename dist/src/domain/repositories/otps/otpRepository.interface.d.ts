import { Otp } from "../../../infrastructure/entities/otps/otps.entity";
export interface OtpServiceInterface {
    generateOtp(userId: number): Promise<Otp>;
    verifyOtp(userId: number, otpCode: string): Promise<boolean>;
}
