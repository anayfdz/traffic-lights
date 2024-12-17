import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NearbyTrafficLightsDto } from 'src/infrastructure/common/dto/traffic-lights/nearby-traffic-lights.dto';
import { TrafficLight } from 'src/infrastructure/entities/traffic-lights/trafficLight.entity';
import { ITrafficLightRepository } from 'src/domain/repositories/traffic-lights/trafficLightRepository.interface';
import { TrafficLightM } from 'src/domain/model/traffic-lights/trafficLight';

 @Injectable()
export class GetNearbyTrafficLightsUseCase {
constructor(
@InjectRepository(TrafficLight)
private readonly trafficLightRepository: ITrafficLightRepository
) {}

async execute(nearbyTrafficLightsDto: NearbyTrafficLightsDto): Promise<TrafficLightM[]> {
const { latitude, longitude, radius = 5 } = nearbyTrafficLightsDto;
if (radius <= 0 || radius > 50) {
    throw new Error('El radio debe ser mayor que 0 y menor que 50 km');
  }
const query = this.trafficLightRepository.findNearby(latitude,longitude, radius * 1000)

return query;
}
}
