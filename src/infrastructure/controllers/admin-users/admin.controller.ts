import { Controller } from "@nestjs/common";


@Controller('admin/reports')
export class AdminController {
    constructor(){} 

    // asignar reportes a semaforos especificos
//     @Put(':id/assign')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   async assignReport(
//     @Param('id') id: number,
//     @Body('traffic_light_id') trafficLightId: number
//   ) {
//     return await this.trafficLightService.assignReportToTrafficLight(id, trafficLightId);
//   }

// marcar reporte como resuelto
// @Put(':id/resolve')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles('admin')
//   async resolveReport(@Param('id') id: number, @Body('status') status: string) {
//     return await this.trafficLightService.resolveReport(id, status);
//   }
}