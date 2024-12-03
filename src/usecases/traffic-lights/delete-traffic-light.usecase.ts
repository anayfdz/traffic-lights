// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { TrafficLight } from '../../entities/traffic-lights/traffic-light.entity';

// @Injectable()
// export class DeleteTrafficLightUseCase {
//   constructor(
//     @InjectRepository(TrafficLight)
//     private readonly trafficLightRepository: Repository<TrafficLight>,
//   ) {}

//   async execute(id: number): Promise<void> {
//     await