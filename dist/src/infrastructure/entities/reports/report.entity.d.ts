import { User } from '../users/user.entity';
import { TrafficLight } from '../traffic-lights/trafficLight.entity';
import { Evidence } from '../evidences/evidences.entity';
export declare class Report {
    id: number;
    user: User;
    trafficLight: TrafficLight;
    description: string;
    status: string;
    comments: string;
    reported_at: Date;
    created_at: Date;
    updated_at: Date;
    evidences: Evidence[];
}
