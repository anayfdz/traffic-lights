import { Report } from '../reports/report.entity';
export declare class TrafficLight {
    id: number;
    latitude: number;
    longitude: number;
    type: string;
    department: string;
    province: string;
    district: string;
    created_at: Date;
    updated_at: Date;
    reports: Report[];
}
