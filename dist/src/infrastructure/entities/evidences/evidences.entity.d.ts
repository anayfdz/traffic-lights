import { Report } from '../reports/report.entity';
export declare class Evidence {
    id: number;
    report: Report;
    file_path: string;
    file_type: string;
    uploaded_at: Date;
}
