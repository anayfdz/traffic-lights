// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TrafficLight } from '../../entities/traffic-lights/traffic-light.entity';

// @Injectable()
// export class FilterTrafficLightsUseCase {
//   constructor(
//     @InjectRepository(TrafficLight)
//     private readonly trafficLightRepository: Repository<TrafficLight>,
//   ) {}

//   async execute(department?: string, province?: string, district?: string): Promise<TrafficLight[]> {
//     const query = this.trafficLightRepository.createQueryBuilder('traffic_light');

//     if (department) {
//       query.andWhere('traffic_light.department = :department', { department });
//     }
//     if (province) {
//       query.andWhere('traffic_light.province = :province', { province });
//     }
//     if (district) {
//       query.andWhere('traffic_light.district = :district', { district });
//     }

//     return query.getMany();
//   }
// }
