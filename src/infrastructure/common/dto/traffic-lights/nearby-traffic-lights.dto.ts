import { IsNumber, IsOptional } from "class-validator";
import { Transform } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class NearbyTrafficLightsDto { 
    @ApiProperty({ description: 'Latitud del punto central para la búsqueda' })
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    latitude: number;
    @ApiProperty({ description: 'Longitud del punto central para la búsqueda' })
    @IsNumber() 
    @Transform(({ value }) => parseFloat(value))
    longitude: number; 
    @ApiProperty({ description: 'Radio en kilómetros para la búsqueda' })
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? parseFloat(value) : 5))
    radius?: number = 5;
}