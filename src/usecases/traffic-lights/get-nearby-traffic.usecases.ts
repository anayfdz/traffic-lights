// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TrafficLight } from '../../entities/traffic-lights/traffic-light.entity';

// @Injectable()
// export class GetNearbyTrafficLightsUseCase {
//   constructor(
//     @InjectRepository(TrafficLight)
//     private readonly trafficLightRepository: Repository<TrafficLight>,
//   ) {}

//   async execute(latitude: number, longitude: number, radius: number = 5): Promise<TrafficLight[]> {
//     const query = this.trafficLightRepository.createQueryBuilder('traffic_light')
//       .where('ST_Distance_Sphere(point(traffic_light.longitude, traffic_light.latitude), point(:longitude, :latitude)) <= :radius', {
//         longitude,
//         latitude,
//         radius: radius * 1000, // Convert radius to meters
//       });

//     return query.getMany();
//   }
// }
