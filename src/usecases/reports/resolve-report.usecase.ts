import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportM, Status } from 'src/domain/model/reports/report';
import { UpdateReportStatusDto } from 'src/infrastructure/common/dto/report/update-report.dto';
import { DatabaseReportRepository } from 'src/infrastructure/repositories/reports/report.repository';

@Injectable()
export class ResolveReportUseCase {
  constructor(private readonly reportRepository: DatabaseReportRepository) {}

  async execute(id: number, status: string): Promise<ReportM> {
    // // Validar el estado
    if (status !== 'pendiente' && status !== 'resuelto') {
        throw new Error('Estado no válido para este tipo de actualización');
      }

      let statusEnum: Status;
    if (status === 'pendiente') {
      statusEnum = Status.Pendiente;
    } else if (status === 'resuelto') {
      statusEnum = Status.Resuelto;
    } else {
      throw new Error('Estado no válido para este tipo de actualización');
    }

    const report = await this.reportRepository.findReportById(id);
    if (!report) {
      throw new NotFoundException('Reporte no encontrado');
    }

    report.status = statusEnum;

    return this.reportRepository.updateReport(report);
  }
}
