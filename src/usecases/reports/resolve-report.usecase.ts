// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ReportM } from 'src/domain/model/reports/report';
// import { IReportRepository } from 'src/domain/repositories/reports/reportRepository.interface';
// import { UpdateReportStatusDto } from 'src/infrastructure/common/dto/report/update-report.dto';

// @Injectable()
// export class ResolveReportUseCase {
//   constructor(private readonly reportRepository: IReportRepository) {}

//   async execute(id: number, updateReportStatusDto: UpdateReportStatusDto): Promise<ReportM> {
//     const { status } = updateReportStatusDto;

//     // Validar el estado
//     if (status !== 'resuelto' && status !== 'pendiente') {
//       throw new Error('Estado no válido');
//     }

//     const report = await this.reportRepository.findReportById(id);
//     if (!report) {
//       throw new NotFoundException('Reporte no encontrado');
//     }

//     report.status = status;

//     return this.reportRepository.updateReport(report);
//   }
// }
