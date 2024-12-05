import { Module } from '@nestjs/common';
import { ReportModule } from 'src/infrastructure/repositories/reports/report.module';
import { TrafficModule } from 'src/infrastructure/repositories/traffic-lights/traffic.module';
import { CreateTrafficLightUseCase } from '../traffic-lights/create-traffic-light.usecase';

@Module({
  imports: [CreateTrafficLightUseCase],
  providers: [ReportModule, TrafficModule],
  exports: [ReportModule, TrafficModule],
})
export class ReportUseCasesModule {}
