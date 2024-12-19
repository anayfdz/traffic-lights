import { Module } from '@nestjs/common';
//import { ReportModule } from 'src/infrastructure/repositories/reports/report.module';
import { ReportModule } from '../../infrastructure/repositories/reports/report.module';
//import { TrafficModule } from 'src/infrastructure/repositories/traffic-lights/traffic.module';
import { TrafficModule } from '../../infrastructure/repositories/traffic-lights/traffic.module';
import { CreateTrafficLightUseCase } from '../traffic-lights/create-traffic-light.usecase';
//import { AssignReportUseCase } from './assign-report.usecase';
//import { DeleteReportUseCase } from './delete-report.usecase';
//import { GetReportDetailsUseCase } from './get-detail-report.usecase';
import { GetUserReportsUseCase } from './get-user-reports.usecase';
//import { ResolveReportUseCase } from './resolve-report.usecase';

@Module({
  imports: [
    CreateTrafficLightUseCase, 
    //AssignReportUseCase, 
    //DeleteReportUseCase, 
    // GetReportDetailsUseCase,
    GetUserReportsUseCase,
    // ResolveReportUseCase
  ],
  providers: [ReportModule, TrafficModule],
  exports: [ReportModule, TrafficModule, 
    // DeleteReportUseCase, 
    // GetReportDetailsUseCase,
    GetUserReportsUseCase,
    // ResolveReportUseCase
  ],
})
export class ReportUseCasesModule {}
