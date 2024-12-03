// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TrafficLight } from 'src/infrastructure/entities/traffic-lights/traffic-light.entity';
// import { FilterTrafficLightsDto } from 'src/infrastructure/common/dto/traffic-light/filter-traffic-lights.dto';

// @Injectable()
// export class FilterTrafficLightsUseCase {
//   constructor(
//     @InjectRepository(TrafficLight)
//     private readonly trafficLightRepository: Repository<TrafficLight>,
//   ) {}

//   async execute(filterTrafficLightsDto: FilterTrafficLightsDto): Promise<TrafficLight[]> {
//     const { department, province, district } = filterTrafficLightsDto;
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

//     return await query.getMany();
//   }
// }
