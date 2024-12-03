import { Status } from "src/domain/model/reports/report";

export class ReportTrafficLightDto { 
    traffic_light_id?: number; 
    latitude: number; 
    longitude: number; 
    status: Status; 
    comments: string; 
    reported_at?: Date; 
    evidences: any[];
    description: string;

}