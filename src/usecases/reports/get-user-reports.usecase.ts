import { Injectable } from '@nestjs/common';
import { ReportM } from 'src/domain/model/reports/report';
import { DatabaseReportRepository } from 'src/infrastructure/repositories/reports/report.repository';

@Injectable()
export class GetUserReportsUseCase {
  constructor(
    private readonly reportRepository: DatabaseReportRepository,
  ) {}

  async execute(filters: {
    status?: string;
    department?: string;
    province?: string;
    district?: string;
    date_range?: string}): Promise<ReportM[]> {
    const reports = await this.reportRepository.findReports(filters);
    if (!reports) {
      throw new Error('Report not found');
    }

    return reports;
  }
}
