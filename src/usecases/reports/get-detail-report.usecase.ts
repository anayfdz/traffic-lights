// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ReportM } from 'src/domain/model/reports/report';
// import { IReportRepository } from 'src/domain/repositories/reports/reportRepository.interface';

// @Injectable()
// export class GetReportDetailsUseCase {
//   constructor(private readonly reportRepository: IReportRepository) {}

//   async execute(id: number): Promise<ReportM> {
//     const report = await this.reportRepository.findReportById(id);

//     if (!report) {
//       throw new NotFoundException('Reporte no encontrado');
//     }

//     return report;
//   }
// }
