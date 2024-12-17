import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrafficLightM } from 'src/domain/model/traffic-lights/trafficLight';
import { ITrafficLightRepository } from 'src/domain/repositories/traffic-lights/trafficLightRepository.interface';
import { UpdateTrafficLightDto } from 'src/infrastructure/common/dto/traffic-lights/update-traffic-light.dto';
import { TrafficLight } from 'src/infrastructure/entities/traffic-lights/trafficLight.entity';

@Injectable()
export class UpdateTrafficLightUseCase {
  constructor(
    @InjectRepository(TrafficLight)
    private readonly trafficLightRepository: ITrafficLightRepository,
  ) {}

  async execute(id: number, updateTrafficLightDto: UpdateTrafficLightDto): Promise<TrafficLightM> {
    const trafficLight = await this.trafficLightRepository.findById(id);
    if (!trafficLight) {
      throw new Error('Semáforo no encontrado');
    }

    if (updateTrafficLightDto.latitude !== undefined) 
        trafficLight.latitude = updateTrafficLightDto.latitude;
    if (updateTrafficLightDto.longitude !== undefined) trafficLight.longitude = updateTrafficLightDto.longitude;
    if (updateTrafficLightDto.type !== undefined) trafficLight.type = updateTrafficLightDto.type;
    if (updateTrafficLightDto.department !== undefined) trafficLight.department = updateTrafficLightDto.department;
    if (updateTrafficLightDto.province !== undefined) trafficLight.province = updateTrafficLightDto.province;
    if (updateTrafficLightDto.district !== undefined) trafficLight.district = updateTrafficLightDto.district;

    if (trafficLight.latitude !== undefined && trafficLight.longitude !== undefined) {
        trafficLight.location = {
          type: 'Point',
          coordinates: [trafficLight.longitude, trafficLight.latitude],
        } as any;
      }
    const updatedTrafficLight = await this.trafficLightRepository.update(trafficLight);
    return updatedTrafficLight;
  }
}
