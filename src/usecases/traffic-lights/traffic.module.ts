import { Module } from '@nestjs/common';
import { CreateTrafficLightUseCase } from '../traffic-lights/create-traffic-light.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { TrafficLight } from 'src/infrastructure/entities/traffic-lights/trafficLight.entity';
import { TrafficLight } from '../../infrastructure/entities/traffic-lights/trafficLight.entity';
//import { DatabaseTrafficLightRepository } from 'src/infrastructure/repositories/traffic-lights/traffic.repository';
import { DatabaseTrafficLightRepository } from '../../infrastructure/repositories/traffic-lights/traffic.repository';
import { FilterTrafficLightsUseCase } from './filter-traffic-lights.usecases';
import { UpdateTrafficLightUseCase } from './update-traffic-light.usecase';
import { GetNearbyTrafficLightsUseCase } from './get-nearby-traffic-lights.usecase';
import { DeleteTrafficLightUseCase } from './delete-traffic-light.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficLight])],
  providers: [DatabaseTrafficLightRepository, CreateTrafficLightUseCase, FilterTrafficLightsUseCase, UpdateTrafficLightUseCase, GetNearbyTrafficLightsUseCase, DeleteTrafficLightUseCase],
  exports: [CreateTrafficLightUseCase, FilterTrafficLightsUseCase, UpdateTrafficLightUseCase, GetNearbyTrafficLightsUseCase, DeleteTrafficLightUseCase],
})
export class TrafficUseCasesModule {}
