import { User } from '../users/user.entity';
export declare class Otp {
    id: number;
    user: User;
    otp_code: string;
    expires_at: Date;
    created_at: Date;
}
