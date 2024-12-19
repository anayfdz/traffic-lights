import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportM } from 'src/domain/model/reports/report';
import { IReportRepository } from 'src/domain/repositories/reports/reportRepository.interface';
import { DatabaseReportRepository } from 'src/infrastructure/repositories/reports/report.repository';

@Injectable()
export class GetReportDetailsUseCase {
  constructor(private readonly reportRepository: DatabaseReportRepository) {}

  async execute(id: number): Promise<ReportM> {
    const report = await this.reportRepository.findReportById(id);

    if (!report) {
      throw new NotFoundException('Reporte no encontrado');
    }

    return report;
  }
}
