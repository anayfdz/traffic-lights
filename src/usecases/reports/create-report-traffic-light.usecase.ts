import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from 'src/infrastructure/common/dto/report/create-report.dto';
import { IReportRepository } from 'src/domain/repositories/reports/reportRepository.interface';
import { ITrafficLightRepository } from 'src/domain/repositories/traffic-lights/trafficLightRepository.interface';
import { ReportM, Status } from 'src/domain/model/reports/report';
import { UserM } from 'src/domain/model/users/user';
import { CreateTrafficLightDto } from 'src/infrastructure/common/dto/traffic-lights/create-traffic-light.dto';
import { CreateTrafficLightUseCase } from '../traffic-lights/create-traffic-light.usecase';
import { CreateEvidenceUseCase } from '../evidences/createEvidences.usecases';

@Injectable()
export class ReportTrafficLightUseCase {
  constructor(
    private readonly reportRepository: IReportRepository,
    private readonly trafficLightRepository: ITrafficLightRepository,
    private readonly createTrafficLightUseCase: CreateTrafficLightUseCase,
    private readonly createEvidenceUseCase: CreateEvidenceUseCase
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
      createTrafficLightDto.latitude = createReportDto.latitude,
      createTrafficLightDto.longitude = createReportDto.longitude,
      createTrafficLightDto.type = createReportDto.type,
      createTrafficLightDto.department = createTrafficLightDto.department,
      createTrafficLightDto.province = createReportDto.province,
      createTrafficLightDto.district = createReportDto.district,

      console.log('Creando semáforo con estos datos:', createTrafficLightDto);
      try {
        trafficLight = await this.createTrafficLightUseCase.execute(createTrafficLightDto);
        if (!trafficLight) {
          throw new Error('Error creating traffic light');
        }
      } catch (err) {
        console.error('Error al crear semáforo:', err);
        throw new Error('Error al crear semáforo');
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

    const savedReport = await this.reportRepository.createReport(reportM)

    // si hay evidencias las creamos
    if (createReportDto.evidences && createReportDto.evidences.length > 0) {
      const filePaths = createReportDto.evidences.map((evidencePath) => evidencePath.filePath);
      const fileTypes = createReportDto.evidences.map((evidencesPath) => evidencesPath.fileType)
      const savedEvidences = await this.createEvidenceUseCase.execute(filePaths, fileTypes, savedReport.id);
      console.log('aqui las evidencias a guardar', savedEvidences);
      reportM.evidences = savedEvidences;
    }
    try {
      return savedReport
    } catch (err) {
      console.log('error en la creacion del reporte', err);
      throw new Error('Error al crear el reporte');
    }
  }
}
