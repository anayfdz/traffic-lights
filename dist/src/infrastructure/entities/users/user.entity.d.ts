import { Report } from '../reports/report.entity';
import { Otp } from '../otps/otps.entity';
export declare class User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    password: string;
    nickname: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    reports: Report[];
    otps: Otp[];
}
