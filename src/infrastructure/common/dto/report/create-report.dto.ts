import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Status } from '../../../../domain/model/reports/report';


export class CreateReportDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  traffic_light_id?: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  province: string;

  
  @ApiProperty()
  @IsString()
  district: string;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsString()
  comments: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : value) 
  @IsDate()
  reported_at?: Date;

  @ApiProperty({ type: [Object] })
  @IsArray()
  @IsOptional()
  evidences: { filePath: string, fileType: string }[];
}
