import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { ReportTrafficLightUseCase } from 'src/usecases/reports/create-report-traffic-light.usecase';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateReportDto } from 'src/infrastructure/common/dto/report/create-report.dto';
import * as path from 'path';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { CreateTrafficLightDto } from 'src/infrastructure/common/dto/traffic-lights/create-traffic-light.dto';
//import { AdminGuard } from '../../common/guards/admin.guard';
import { FilterTrafficLightsDto } from 'src/infrastructure/common/dto/traffic-lights/filter-traffic-lights.dto';
import { FilterTrafficLightsUseCase } from 'src/usecases/traffic-lights/filter-traffic-lights.usecases';
import { In } from 'typeorm';
import { CreateTrafficLightUseCase } from 'src/usecases/traffic-lights/create-traffic-light.usecase';
import { RolesGuard } from 'src/infrastructure/common/guards/roles.guard';
import { Roles } from 'src/infrastructure/common/decorators/roles.decorator';
import { JwtAdminAuthGuard } from 'src/infrastructure/common/guards/JwtAuthAdmin.guard';
@Controller('api')
export class TrafficLightController {
  constructor(
    @Inject(UsecasesProxyModule.ReportTrafficLightUseCaseProxy)
    private readonly reportTrafficLightUseCase: UseCaseProxy<ReportTrafficLightUseCase>,
    @Inject(UsecasesProxyModule.FilterTrafficLightsUseCaseProxy)
    private readonly filterTrafficLightsUseCase: UseCaseProxy<FilterTrafficLightsUseCase>,
    @Inject(UsecasesProxyModule.CreateTrafficLightUseCaseProxy)
    private readonly createTrafficLightUseCase: UseCaseProxy<CreateTrafficLightUseCase>,
  ) {}

  @Post('traffic-lights/report')
  @UseInterceptors(
    FilesInterceptor('evidences', 10, {
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
    console.log('evidencias subidas', evidence);
    if (!evidence || evidence.length === 0) {
      return { message: 'No se recibieron evidencias' };
    }
    const userId = req.user.id;
    console.log('user', userId);

    createReportDto.evidences = createReportDto.evidences || [];
    console.log('Evidencias en DTO antes de procesar:', createReportDto.evidences);

    if (evidence && evidence.length > 0) {
      const evidencePaths = evidence.map((file) => ({
        filePath: path.join('uploads', file.filename),
        fileType: 'image',
      }));
      createReportDto.evidences.push(...evidencePaths);
    }

    const reportUseCase = this.reportTrafficLightUseCase.getInstance();
    const createdReport = await reportUseCase.execute(userId, createReportDto);
    return { message: 'Reporte creado con éxito', createdReport };
  }

  @Get('traffic-lights/filter')
  async filterTrafficLights(@Query() filterTrafficLightsDto: FilterTrafficLightsDto) {
    console.log('DTO recibido:', filterTrafficLightsDto);
    return await this.filterTrafficLightsUseCase
      .getInstance()
      .execute(filterTrafficLightsDto.department, filterTrafficLightsDto.province, filterTrafficLightsDto.district);
  }
  // @Get('traffic-lights/nearby')
  // async getNearbyTrafficLights(@Query() nearbyTrafficLightsDto: NearbyTrafficLightsDto) {
  //     return this.trafficLightService.getNearbyTrafficLights(nearbyTrafficLightsDto);
  // }

  @Post('traffic-lights')
  @UseGuards(JwtAdminAuthGuard)
  async create(@Body() createTrafficLightDto: CreateTrafficLightDto) {
    console.log('Solicitud recibida:', createTrafficLightDto); 
    return await this.createTrafficLightUseCase.getInstance().execute(createTrafficLightDto);
  }

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
