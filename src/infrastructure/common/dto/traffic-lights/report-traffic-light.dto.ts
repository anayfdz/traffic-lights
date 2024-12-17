import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { Status } from "../../../../domain/model/reports/report";

export class ReportTrafficLightDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
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
    @IsOptional()
    evidences: any[];

}