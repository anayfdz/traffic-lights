// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TrafficLight } from '../../entities/traffic-lights/traffic-light.entity';
// import { UpdateTrafficLightDto } from '../../common/dto/traffic-light/update-traffic-light.dto';

// @Injectable()
// export class UpdateTrafficLightUseCase {
//   constructor(
//     @InjectRepository(TrafficLight)
//     private readonly trafficLightRepository: Repository<TrafficLight>,
//   ) {}

//   async execute(id: number, updateTrafficLightDto: UpdateTrafficLightDto): Promise<TrafficLight> {
//     await this.trafficLightRepository.update(id, updateTrafficLightDto);
//     return this.trafficLightRepository.findOne(id);
//   }
// }
