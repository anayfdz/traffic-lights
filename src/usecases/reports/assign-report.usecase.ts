// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ReportM } from 'src/domain/model/reports/report';
// import { IReportRepository } from 'src/domain/repositories/reports/reportRepository.interface';
// import { ITrafficLightRepository } from 'src/domain/repositories/traffic-lights/trafficLightRepository.interface';

// @Injectable()
// export class AssignReportUseCase {
//   constructor(
//     private readonly reportRepository: IReportRepository,
//     private readonly trafficLightRepository: ITrafficLightRepository,
//   ) {}

//   async execute(reportId: number, trafficLightId: number): Promise<ReportM> {
//     const report = await this.reportRepository.findReportById(reportId);
//     if (!report) {
//       throw new NotFoundException('Reporte no encontrado');
//     }

//     const trafficLight = await this.trafficLightRepository.findTrafficLightById(trafficLightId);
//     if (!trafficLight) {
//       throw new NotFoundException('Semáforo no encontrado');
//     }

//     report.assignTrafficLight(trafficLight);

//     return this.reportRepository.updateReport(report);
//   }
// }
