import { Body, Controller, Get, Inject, Post, Query, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReportTrafficLightDto } from '../../common/dto/traffic-lights/report-traffic-light.dto';
import { FilterTrafficLightsDto } from '../../common/dto/traffic-lights/filter-traffic-lights.dto';
import { NearbyTrafficLightsDto } from '../../common/dto/traffic-lights/nearby-traffic-lights.dto';
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

    ) { }

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
        @UploadedFile() evidence: Express.Multer.File,
    ) {
        const userId = req.user.id;

        // Si se ha subido un archivo de evidencia, lo procesamos
        if (evidence) {
            const filePath = path.join('uploads', evidence.filename);
            // Asociamos la evidencia (ruta del archivo) al DTO de reporte
            createReportDto.evidences = createReportDto.evidences || [];
            createReportDto.evidences.push(filePath);
        }

        const reportUseCase = this.reportTrafficLightUseCase.getInstance();
        const createdReport = await reportUseCase.execute(userId, createReportDto);

        return { message: 'Reporte creado con éxito', createdReport };
    }

    // @Get('user/reports') 
    // async getUserReports() { 
    //     return this.trafficLightService.getUserReports(); 
    // // } 
    // @Get('traffic-lights/filter') 
    // async filterTrafficLights(@Query() filterTrafficLightsDto: FilterTrafficLightsDto) { 
    //     return this.trafficLightService.filterTrafficLights(filterTrafficLightsDto); 
    // } 
    // @Get('traffic-lights/nearby') 
    // async getNearbyTrafficLights(@Query() nearbyTrafficLightsDto: NearbyTrafficLightsDto) { 
    //     return this.trafficLightService.getNearbyTrafficLights(nearbyTrafficLightsDto);
    // }
}