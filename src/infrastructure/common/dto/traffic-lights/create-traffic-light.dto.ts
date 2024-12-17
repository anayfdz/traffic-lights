import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../../../../domain/model/traffic-lights/trafficLight'
export class CreateTrafficLightDto { 
    @ApiProperty({ description: 'Latitude of the traffic light' })
    latitude: number; 
    @ApiProperty({ description: 'Longitude of the traffic light' })
    longitude: number; 
    @ApiProperty({ description: 'Type of the traffic light' })
    type: string; 
    @ApiProperty({ description: 'Department where the traffic light is located' })
    department: string; 
    @ApiProperty({ description: 'Province where the traffic light is located' })
    province: string; 
    @ApiProperty({ description: 'District where the traffic light is located' })
    district: string;
    @ApiProperty({ description: 'Location object with latitude and longitude' })
    location: Location;
}