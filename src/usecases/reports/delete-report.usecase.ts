// import { Injectable, NotFoundException } from '@nestjs/common';
// import { IReportRepository } from 'src/domain/repositories/reports/reportRepository.interface';

// @Injectable()
// export class DeleteReportUseCase {
//   constructor(private readonly reportRepository: IReportRepository) {}

//   async execute(id: number): Promise<void> {
//     const report = await this.reportRepository.findReportById(id);
//     if (!report) {
//       throw new NotFoundException('Reporte no encontrado');
//     }

//     await this.reportRepository.deleteReport(id);
//   }
// }
