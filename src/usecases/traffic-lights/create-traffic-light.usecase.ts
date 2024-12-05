import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITrafficLightRepository } from '../../domain/repositories/traffic-lights/trafficLightRepository.interface';
import { TrafficLight } from 'src/infrastructure/entities/traffic-lights/trafficLight.entity';
import { CreateTrafficLightDto } from 'src/infrastructure/common/dto/traffic-lights/create-traffic-light.dto';
import { TrafficLightM } from 'src/domain/model/traffic-lights/trafficLight';

@Injectable()
export class CreateTrafficLightUseCase {
  constructor(
    @InjectRepository(TrafficLight)
    private readonly trafficLightRepository: ITrafficLightRepository,
  ) {}

  async execute(createTrafficLightDto: CreateTrafficLightDto): Promise<TrafficLightM> {
    const existTrafficLight = await this.trafficLightRepository.findNearby(
        createTrafficLightDto.latitude,
        createTrafficLightDto.longitude,
        0.1, // radio de proximidad
      );
      console.log('exist traffic near', existTrafficLight)
      if (existTrafficLight.length > 0) {
        throw new ConflictException('Traffic light already exists near this location');
      }

      // Crear una instancia de TrafficLightM desde el DTO
        const trafficLightM = new TrafficLightM(
        null, // ID es nulo ya que será asignado automáticamente al guardar
        createTrafficLightDto.latitude,
        createTrafficLightDto.longitude,
        createTrafficLightDto.type,
        createTrafficLightDto.department,
        createTrafficLightDto.province,
        createTrafficLightDto.district,
        createTrafficLightDto.location,
        new Date(),
        new Date(),
      )
      console.log('before creation', trafficLightM)
  
      // Si no existe, creamos el semáforo
      const trafficLight = await this.trafficLightRepository.create(trafficLightM);
      console.log('creanding', trafficLight)
  
      if (!trafficLight) {
        throw new Error('Error creating traffic light');
      }
    return this.trafficLightRepository.save(trafficLight);
  }
}
