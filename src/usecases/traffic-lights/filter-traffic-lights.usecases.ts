import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrafficLight } from '../../infrastructure/entities/traffic-lights/trafficLight.entity';
//import { ITrafficLightRepository } from 'src/domain/repositories/traffic-lights/trafficLightRepository.interface';
import { ITrafficLightRepository } from '../../domain/repositories/traffic-lights/trafficLightRepository.interface';
//import { TrafficLightM } from 'src/domain/model/traffic-lights/trafficLight';
import { TrafficLightM } from '../../domain/model/traffic-lights/trafficLight';


@Injectable()
export class FilterTrafficLightsUseCase {
  constructor(
    @InjectRepository(TrafficLight)
    private readonly trafficLightRepository: ITrafficLightRepository,
  ) {}

  async execute(department?: string, province?: string, district?: string): Promise<TrafficLightM[]> {
    const trafficLights  = await this.trafficLightRepository.filterTraffic(department, province, district);
    return trafficLights;
  }
}
