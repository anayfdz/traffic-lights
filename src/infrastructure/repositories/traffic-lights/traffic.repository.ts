// src/infrastructure/repositories/traffic-lights/database-traffic-light.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrafficLightM } from 'src/domain/model/traffic-lights/trafficLight';
import { ITrafficLightRepository } from 'src/domain/repositories/traffic-lights/trafficLightRepository.interface';
import { TrafficLight } from 'src/infrastructure/entities/traffic-lights/trafficLight.entity';

@Injectable()
export class DatabaseTrafficLightRepository implements ITrafficLightRepository {
  constructor(
    @InjectRepository(TrafficLight)
    private readonly trafficLightRepository: Repository<TrafficLight>,
  ) {}

  // Crear un nuevo semáforo
  async create(trafficLight: TrafficLightM): Promise<TrafficLightM> {
    const newTrafficLight = this.trafficLightRepository.create({
      latitude: trafficLight.latitude,
      longitude: trafficLight.longitude,
      type: trafficLight.type,
      department: trafficLight.department,
      province: trafficLight.province,
      district: trafficLight.district,
    });
    
    const savedTrafficLight = await this.trafficLightRepository.save(newTrafficLight);
    
    // Convertir a modelo TrafficLightM
    return this.toTrafficLightM(savedTrafficLight);
  }

  // Buscar un semáforo por su ID
  async findById(id: number): Promise<TrafficLightM | undefined> {
    const trafficLight = await this.trafficLightRepository.findOne({ where: { id }});
    return trafficLight ? this.toTrafficLightM(trafficLight) : undefined;
  }

  // Encontrar semáforos cercanos a una ubicación dada (latitud, longitud) dentro de un radio
  async findNearby(latitude: number, longitude: number, radius: number): Promise<TrafficLightM[]> {
    const trafficLights = await this.trafficLightRepository.find();
    // Lógica de proximidad, por ejemplo, usando distancia euclidiana o fórmula de Haversine
    return trafficLights.filter((trafficLight) => {
      const distance = this.calculateDistance(latitude, longitude, trafficLight.latitude, trafficLight.longitude);
      return distance <= radius;
    }).map(this.toTrafficLightM);
  }

  // Filtrar semáforos por departamento, provincia o distrito
  async filter(department?: string, province?: string, district?: string): Promise<TrafficLightM[]> {
    const queryBuilder = this.trafficLightRepository.createQueryBuilder('trafficLight');
    
    if (department) {
      queryBuilder.andWhere('trafficLight.department = :department', { department });
    }
    if (province) {
      queryBuilder.andWhere('trafficLight.province = :province', { province });
    }
    if (district) {
      queryBuilder.andWhere('trafficLight.district = :district', { district });
    }

    const trafficLights = await queryBuilder.getMany();
    return trafficLights.map(this.toTrafficLightM);
  }

  // Actualizar un semáforo
  async update(trafficLight: TrafficLightM): Promise<TrafficLightM> {
    const existingTrafficLight = await this.trafficLightRepository.findOne({ where: { id: trafficLight.id}});
    
    if (!existingTrafficLight) {
      throw new Error('Traffic light not found');
    }

    existingTrafficLight.latitude = trafficLight.latitude;
    existingTrafficLight.longitude = trafficLight.longitude;
    existingTrafficLight.type = trafficLight.type;
    existingTrafficLight.department = trafficLight.department;
    existingTrafficLight.province = trafficLight.province;
    existingTrafficLight.district = trafficLight.district;

    const updatedTrafficLight = await this.trafficLightRepository.save(existingTrafficLight);
    return this.toTrafficLightM(updatedTrafficLight);
  }

  // Eliminar un semáforo por ID
  async delete(id: number): Promise<void> {
    await this.trafficLightRepository.delete(id);
  }

  // Método de conversión de entidad a modelo (TrafficLight -> TrafficLightM)
  private toTrafficLightM(trafficLight: TrafficLight): TrafficLightM {
    return new TrafficLightM(
      trafficLight.id,
      trafficLight.latitude,
      trafficLight.longitude,
      trafficLight.type,
      trafficLight.department,
      trafficLight.province,
      trafficLight.district,
      trafficLight.created_at,
      trafficLight.updated_at
    );
  }

  // Método para calcular la distancia entre dos puntos (en latitud/longitud)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
