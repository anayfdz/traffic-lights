// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TrafficLight } from '../../entities/traffic-lights/traffic-light.entity';
// import { CreateTrafficLightDto } from '../../common/dto/traffic-light/create-traffic-light.dto';

// @Injectable()
// export class CreateTrafficLightUseCase {
//   constructor(
//     @InjectRepository(TrafficLight)
//     private readonly trafficLightRepository: Repository<TrafficLight>,
//   ) {}

//   async execute(createTrafficLightDto: CreateTrafficLightDto): Promise<TrafficLight> {
//     const trafficLight = this.trafficLightRepository.create(createTrafficLightDto);
//     return this.trafficLightRepository.save(trafficLight);
//   }
// }
