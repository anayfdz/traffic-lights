import { Body, Controller, Get, Inject, Post, Query, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { ReportTrafficLightUseCase } from 'src/usecases/reports/create-report-traffic-light.usecase';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateReportDto } from 'src/infrastructure/common/dto/report/create-report.dto';
import * as path from 'path';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
@Controller('api')
export class TrafficLightController {
  constructor(
    @Inject(UsecasesProxyModule.ReportTrafficLightUseCaseProxy)
    private readonly reportTrafficLightUseCase: UseCaseProxy<ReportTrafficLightUseCase>,
  ) {}
// reporte de semaforo
  @Post('traffic-lights/report')
  @UseInterceptors(
    FileInterceptor('evidences', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}_${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard)
  async reportTrafficLight(
    @Body() createReportDto: CreateReportDto,
    @Request() req: any,
    @UploadedFiles() evidence: Express.Multer.File[],
  ) {
    const userId = req.user.id;
    console.log('user', userId);

    // Si se ha subido un archivo de evidencia, lo procesamos
    if (evidence && evidence.length > 0) {
        createReportDto.evidences = createReportDto.evidences || [];
        // Agregar las rutas de los archivos subidos al DTO
      evidence.forEach((file) => {
        const filePath = path.join('uploads', file.filename);
        createReportDto.evidences.push(filePath);
      });;
    }

    const reportUseCase = this.reportTrafficLightUseCase.getInstance();
    const createdReport = await reportUseCase.execute(userId, createReportDto);

    return { message: 'Reporte creado con éxito', createdReport };
  }

  // @Get('user/reports')
  // async getUserReports() {
  //     return this.trafficLightService.getUserReports();
  // // }

  // filtrar semaforo solo admins
  // @Get('traffic-lights/filter')
  // async filterTrafficLights(@Query() filterTrafficLightsDto: FilterTrafficLightsDto) {
  //     return this.trafficLightService.filterTrafficLights(filterTrafficLightsDto);
  // }
  // @Get('traffic-lights/nearby')
  // async getNearbyTrafficLights(@Query() nearbyTrafficLightsDto: NearbyTrafficLightsDto) {
  //     return this.trafficLightService.getNearbyTrafficLights(nearbyTrafficLightsDto);
  // }
  // crear semaforo solo admis
  // @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)  // Verifica JWT y roles
  // @Roles('admin')  // Solo los administradores pueden acceder
  // async create(@Body() createTrafficLightDto: CreateTrafficLightDto) {
  //   return await this.trafficLightService.create(createTrafficLightDto);
  // }

  // actualizar semaforo solo admin
  // @Put(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  // async update(
  //   @Param('id') id: number, 
  //   @Body() updateTrafficLightDto: CreateTrafficLightDto
  // ) {
  //   return await this.trafficLightService.update(id, updateTrafficLightDto);
  // }

  // eliminar semaforo solo admins 
  // @Delete(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  // async delete(@Param('id') id: number) {
  //   return await this.trafficLightService.delete(id);
  // }
}
