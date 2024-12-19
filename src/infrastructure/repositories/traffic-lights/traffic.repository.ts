import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { TrafficLightM } from 'src/domain/model/traffic-lights/trafficLight';
import { TrafficLightM } from '../../../domain/model/traffic-lights/trafficLight';
//import { ITrafficLightRepository } from 'src/domain/repositories/traffic-lights/trafficLightRepository.interface';
import { ITrafficLightRepository } from '../../../domain/repositories/traffic-lights/trafficLightRepository.interface';
//import { TrafficLight } from 'src/infrastructure/entities/traffic-lights/trafficLight.entity';
import { TrafficLight } from '../../../infrastructure/entities/traffic-lights/trafficLight.entity';
import { CreateTrafficLightDto } from '../../common/dto/traffic-lights/create-traffic-light.dto';

@Injectable()
export class DatabaseTrafficLightRepository implements ITrafficLightRepository {
  constructor(
    @InjectRepository(TrafficLight)
    private readonly trafficLightRepository: Repository<TrafficLight>,
  ) {}

  async create(trafficLight: CreateTrafficLightDto): Promise<TrafficLightM> {
    const newTrafficLight = this.trafficLightRepository.create({
      latitude: trafficLight.latitude,
      longitude: trafficLight.longitude,
      type: trafficLight.type,
      department: trafficLight.department,
      province: trafficLight.province,
      district: trafficLight.district,
      location: { type: 'Point', coordinates: [trafficLight.longitude, trafficLight.latitude] },
    });

    const savedTrafficLight = await this.trafficLightRepository.save(newTrafficLight);
    console.log('fro repository create', savedTrafficLight);

    return this.toTrafficLightM(savedTrafficLight);
  }

  async findById(id: number): Promise<TrafficLightM | undefined> {
    const trafficLight = await this.trafficLightRepository.findOne({ where: { id } });
    return trafficLight ? this.toTrafficLightM(trafficLight) : undefined;
  }

  async findNearby(latitude: number, longitude: number, radius: number): Promise<TrafficLightM[]> {
    const trafficLights = await this.trafficLightRepository
      .createQueryBuilder('trafficLight')
      .where(`ST_DWithin(trafficLight.location, ST_SetSRID(ST_Point(:longitude, :latitude), 4326), :radius)`, {
        latitude,
        longitude,
        radius,
      })
      .getMany();
    console.log('nerby traffic', trafficLights);
    return trafficLights.map(this.toTrafficLightM);
  }

  // async findTrafficLightById(id: number): Promise<TrafficLightM | undefined> {
  //   const findTraffic = await this.trafficLightRepository.findOne({ where: { id } });
  //   return this.toTrafficLightM(findTraffic)
  // }

  async filterTraffic(department?: string, province?: string, district?: string): Promise<TrafficLightM[]> {
    const queryBuilder = this.trafficLightRepository.createQueryBuilder('tl');

    if (department) {
      queryBuilder.andWhere('tl.department = :department', { department });
    }
    if (province) {
      queryBuilder.andWhere('tl.province = :province', { province });
    }
    if (district) {
      queryBuilder.andWhere('tl.district = :district', { district });
    }

    const trafficLights = await queryBuilder.getMany();
    console.log('Consulta generada:', queryBuilder.getQueryAndParameters());
    console.log('Resultados:', trafficLights);
    return trafficLights.map(this.toTrafficLightM);
  }

  async update(trafficLight: TrafficLightM): Promise<TrafficLightM> {
    const existingTrafficLight = await this.trafficLightRepository.findOne({ where: { id: trafficLight.id } });

    if (!existingTrafficLight) {
      throw new Error('Traffic light not found');
    }

    existingTrafficLight.latitude = trafficLight.latitude;
    existingTrafficLight.longitude = trafficLight.longitude;
    existingTrafficLight.type = trafficLight.type;
    existingTrafficLight.department = trafficLight.department;
    existingTrafficLight.province = trafficLight.province;
    existingTrafficLight.district = trafficLight.district;
    existingTrafficLight.location = { type: 'Point', coordinates: [trafficLight.longitude, trafficLight.latitude] };

    const updatedTrafficLight = await this.trafficLightRepository.save(existingTrafficLight);
    return this.toTrafficLightM(updatedTrafficLight);
  }

  async delete(id: number): Promise<void> {
    await this.trafficLightRepository.delete(id);
  }

  async save(trafficLight: TrafficLightM): Promise<TrafficLightM> {
    const savedTrafficLight = await this.trafficLightRepository.save({ ...trafficLight });
    return this.toTrafficLightM(savedTrafficLight);
  }

  // Método de conversión de entidad a modelo (TrafficLight -> TrafficLightM)
  private toTrafficLightM(trafficLight: TrafficLight): TrafficLightM {
    const location = trafficLight.location
      ? {
          latitude: trafficLight.location.coordinates[1],
          longitude: trafficLight.location.coordinates[0],
        }
      : { latitude: 0, longitude: 0 };
    return new TrafficLightM(
      trafficLight.id,
      trafficLight.latitude,
      trafficLight.longitude,
      trafficLight.type,
      trafficLight.department,
      trafficLight.province,
      trafficLight.district,
      location,
      trafficLight.created_at,
      trafficLight.updated_at,
    );
  }
}
