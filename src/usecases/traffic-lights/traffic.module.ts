import { Module } from '@nestjs/common';
import { ReportModule } from 'src/infrastructure/repositories/reports/report.module';
import { TrafficModule } from 'src/infrastructure/repositories/traffic-lights/traffic.module';
import { CreateTrafficLightUseCase } from '../traffic-lights/create-traffic-light.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrafficLight } from 'src/infrastructure/entities/traffic-lights/trafficLight.entity';
import { DatabaseTrafficLightRepository } from 'src/infrastructure/repositories/traffic-lights/traffic.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficLight])],
  providers: [DatabaseTrafficLightRepository, CreateTrafficLightUseCase],
  exports: [CreateTrafficLightUseCase],
})
export class TrafficUseCasesModule {}
