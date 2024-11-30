// import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { ReportTrafficLightDto } from '../../common/dto/traffic-lights/report-traffic-light.dto';
// import { FilterTrafficLightsDto } from '../../common/dto/traffic-lights/filter-traffic-lights.dto';
// import { NearbyTrafficLightsDto } from '../../common/dto/traffic-lights/nearby-traffic-lights.dto';
// import { DatabaseUserRepository } from '../../repositories/traffic-lights/traffic.repository';
// @Controller('api')
// export class TrafficLightController {
//     constructor(private readonly trafficService: TrafficLightService ){}

//     @Post('traffic-lights/report') 
//     async reportTrafficLight(@Body() reportTrafficLightDto: ReportTrafficLightDto) { 
//         return this.trafficLightService.reportTrafficLight(reportTrafficLightDto); 
//     } 
//     @Get('user/reports') 
//     async getUserReports() { 
//         return this.trafficLightService.getUserReports(); 
//     } 
//     @Get('traffic-lights/filter') 
//     async filterTrafficLights(@Query() filterTrafficLightsDto: FilterTrafficLightsDto) { 
//         return this.trafficLightService.filterTrafficLights(filterTrafficLightsDto); 
//     } 
//     @Get('traffic-lights/nearby') 
//     async getNearbyTrafficLights(@Query() nearbyTrafficLightsDto: NearbyTrafficLightsDto) { 
//         return this.trafficLightService.getNearbyTrafficLights(nearbyTrafficLightsDto);
//     }
// }