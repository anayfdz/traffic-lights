import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTrafficLightDto { 
    @IsOptional()
    @IsNumber()
    latitude?: number; 
    
    @IsOptional()
    @IsNumber()
    longitude?: number; 
    
    @IsOptional()
    @IsString()
    type?: string; 
  
    @IsOptional()
    @IsString()
    department: string; 
    
    @IsOptional()
    @IsString()
    province: string; 
    
    @IsOptional()
    @IsString()
    district: string;
  }
  