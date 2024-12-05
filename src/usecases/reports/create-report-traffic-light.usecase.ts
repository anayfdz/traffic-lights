import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/entities/users/user.entity';
import { Report } from 'src/infrastructure/entities/reports/report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from 'src/infrastructure/common/dto/report/create-report.dto';
import { IReportRepository } from 'src/domain/repositories/reports/reportRepository.interface';
import { ITrafficLightRepository } from 'src/domain/repositories/traffic-lights/trafficLightRepository.interface';
import { ReportM, Status } from 'src/domain/model/reports/report';
import { Evidence } from 'src/infrastructure/entities/evidences/evidences.entity';
import { UserM } from 'src/domain/model/users/user';
import { EvidenceM, FileType } from 'src/domain/model/evidences/evidence';
import { CreateTrafficLightDto } from 'src/infrastructure/common/dto/traffic-lights/create-traffic-light.dto';
import { CreateTrafficLightUseCase } from '../traffic-lights/create-traffic-light.usecase';

@Injectable()
export class ReportTrafficLightUseCase {
  constructor(
    private readonly reportRepository: IReportRepository,
    private readonly trafficLightRepository: ITrafficLightRepository,
    private readonly createTrafficLightUseCase: CreateTrafficLightUseCase,
  ) { }

  async execute(userId: number, createReportDto: CreateReportDto): Promise<ReportM> {
    let trafficLight = null;
    if (createReportDto.traffic_light_id) {
      trafficLight = await this.trafficLightRepository.findById(createReportDto.traffic_light_id);
      if (!trafficLight) {
        throw new NotFoundException('Traffic Light not found');
      }
    } else {
      const createTrafficLightDto = new CreateTrafficLightDto();
      createTrafficLightDto.latitude = createTrafficLightDto.latitude,
      createTrafficLightDto.longitude = createTrafficLightDto.longitude,
      createTrafficLightDto.type = createTrafficLightDto.type,
      createTrafficLightDto.department = createTrafficLightDto.department,
      createTrafficLightDto.province = createTrafficLightDto.province,
      createTrafficLightDto.district = createTrafficLightDto.district,
      trafficLight = await this.createTrafficLightUseCase.execute(createTrafficLightDto);
      if (!trafficLight) {
        throw new Error('Error creating traffic light');
      }
    }
    const status = createReportDto.status;

    const reportM = new ReportM(
      null,
      { id: userId } as UserM,
      trafficLight,
      createReportDto.description,
      status,
      createReportDto.comments,
      createReportDto.reported_at || new Date(),
    );


    // si hay evidencias las creamos
    if (createReportDto.evidences && createReportDto.evidences.length > 0) {
      reportM.evidences = createReportDto.evidences.map((evidencePath) => {
        const evidenceM = new EvidenceM(
          0,
          evidencePath,
          FileType.Image,
          0,
          new Date(),
          new Date(),
        );
        return evidenceM;
      });
    }
    try {
      const savedReport = await this.reportRepository.createReport(reportM)
      return savedReport
    } catch (err) {
      console.log('error en la creacion del reporte', err)
    }
  }
}
