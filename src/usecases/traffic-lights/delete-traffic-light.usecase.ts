import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITrafficLightRepository } from 'src/domain/repositories/traffic-lights/trafficLightRepository.interface';
import { TrafficLight } from 'src/infrastructure/entities/traffic-lights/trafficLight.entity';

@Injectable()
export class DeleteTrafficLightUseCase {
  constructor(
    @InjectRepository(TrafficLight)
    private readonly trafficLightRepository: ITrafficLightRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.trafficLightRepository.delete(id);
  }
}
