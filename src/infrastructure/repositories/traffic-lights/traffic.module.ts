import { Module } from '@nestjs/common';
import { DatabaseTrafficLightRepository } from './traffic.repository';

@Module({
imports: [
 ],
  providers: [DatabaseTrafficLightRepository],
  exports: [DatabaseTrafficLightRepository],
})
export class TrafficModule {}
