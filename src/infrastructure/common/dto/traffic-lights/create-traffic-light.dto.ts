import { Location } from '../../../../domain/model/traffic-lights/trafficLight'
export class CreateTrafficLightDto { 
    latitude: number; 
    longitude: number; 
    type: string; 
    department: string; 
    province: string; 
    district: string;
    location: Location;
}