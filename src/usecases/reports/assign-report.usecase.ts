import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportM } from 'src/domain/model/reports/report';
import { DatabaseReportRepository } from 'src/infrastructure/repositories/reports/report.repository';
import { DatabaseTrafficLightRepository } from 'src/infrastructure/repositories/traffic-lights/traffic.repository';

@Injectable()
export class AssignReportUseCase {
  constructor(
    private readonly reportRepository: DatabaseReportRepository,
    private readonly trafficLightRepository: DatabaseTrafficLightRepository,
  ) {}

  async execute(reportId: number, trafficLightId: number): Promise<ReportM> {
    const report = await this.reportRepository.findReportById(reportId);
    if (!report) {
      throw new NotFoundException('Reporte no encontrado');
    }

    const trafficLight = await this.trafficLightRepository.findById(trafficLightId);
    if (!trafficLight) {
      throw new NotFoundException('Semáforo no encontrado');
    }

    report.assignTrafficLight(trafficLight);

    return this.reportRepository.updateReport(report);
  }
}
