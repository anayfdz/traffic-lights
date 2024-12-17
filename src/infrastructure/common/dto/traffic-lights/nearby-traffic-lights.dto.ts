import { IsNumber, IsOptional } from "class-validator";
import { Transform } from 'class-transformer';

export class NearbyTrafficLightsDto { 
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    latitude: number;
    @IsNumber() 
    @Transform(({ value }) => parseFloat(value))
    longitude: number; 
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseFloat(value) : 5))
    radius?: number = 5;
}