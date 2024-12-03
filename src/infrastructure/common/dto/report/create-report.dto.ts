import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/domain/model/reports/report';


export class CreateReportDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  traffic_light_id?: number;

  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
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
  @IsDate()
  reported_at?: Date;

  @ApiProperty({ type: [String] })
  @IsArray()
  evidences: string[];
}
