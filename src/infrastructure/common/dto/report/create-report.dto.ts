import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Status } from '../../../../domain/model/reports/report';


export class CreateReportDto {
  @ApiProperty({ required: false, description: 'ID del semáforo reportado' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  traffic_light_id?: number;

  @ApiProperty({ description: 'Latitud del semáforo reportado' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Tipo de reporte' })
  @IsString()
  type: string;

  @ApiProperty({description: 'Provincia donde se reporta el semáforo'})
  @IsString()
  province: string;

  
  @ApiProperty({ description: 'Distrito donde se reporta el semáforo'})
  @IsString()
  district: string;

  @ApiProperty({ description: 'Longitud del semáforo reportado'})
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: 'Estado del semáforo'})
  @IsEnum(Status)
  status: Status;

  @ApiProperty({description: 'Comentarios adicionales sobre el reporte', required: false})
  @IsString()
  comments: string;

  @ApiProperty({ description: 'Descripción del reporte' })
  @IsString()
  description: string;

  @ApiProperty({ required: false, description: 'Fecha y hora del reporte', format: 'date-time' })
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : value) 
  @IsDate()
  reported_at?: Date;

  @ApiProperty({ type: [Object], description: 'Evidencias en forma de archivos (imágenes)', required: false })
  @IsArray()
  @IsOptional()
  evidences: { filePath: string, fileType: string }[];
}
