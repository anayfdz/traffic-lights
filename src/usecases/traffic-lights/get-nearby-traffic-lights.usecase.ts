// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TrafficLight } from '../../entities/traffic-lights/traffic-light.entity';
// import { NearbyTrafficLightsDto } from 'src/infrastructure/common/dto/traffic-lights/nearby-traffic-lights.dto';

// @Injectable()
// export class GetNearbyTrafficLightsUseCase {
//   constructor(
//     @InjectRepository(TrafficLight)
//     private readonly trafficLightRepository: Repository<TrafficLight>,
//   ) {}

//   async execute(nearbyTrafficLightsDto: NearbyTrafficLightsDto): Promise<TrafficLight[]> {
//     const query = this.trafficLightRepository.createQueryBuilder('traffic_light')
//       .where('ST_Distance_Sphere(point(traffic_light.longitude, traffic_light.latitude), point(:longitude, :latitude)) <= :radius', {
//         nearbyTrafficLightsDto.longitude,
//         nearbyTrafficLightsDto.latitude,
//         nearbyTrafficLightsDto.radius: radius * 1000,
//       });

//     return query.getMany();
//   }
// }
