import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
//import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
//import { ReportTrafficLightUseCase } from 'src/usecases/reports/create-report-traffic-light.usecase';
import { ReportTrafficLightUseCase } from '../../../usecases/reports/create-report-traffic-light.usecase';
//import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
//import { CreateReportDto } from 'src/infrastructure/common/dto/report/create-report.dto';
import { CreateReportDto } from '../../common/dto/report/create-report.dto';
import * as path from 'path';
//import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { CreateTrafficLightDto } from '../../common/dto/traffic-lights/create-traffic-light.dto';
//import { FilterTrafficLightsDto } from 'src/infrastructure/common/dto/traffic-lights/filter-traffic-lights.dto';
import { FilterTrafficLightsDto } from '../../common/dto/traffic-lights/filter-traffic-lights.dto';
//import { FilterTrafficLightsUseCase } from 'src/usecases/traffic-lights/filter-traffic-lights.usecases';
import { FilterTrafficLightsUseCase } from '../../../usecases/traffic-lights/filter-traffic-lights.usecases';
//import { CreateTrafficLightUseCase } from 'src/usecases/traffic-lights/create-traffic-light.usecase';
import { CreateTrafficLightUseCase } from '../../../usecases/traffic-lights/create-traffic-light.usecase';
//import { JwtAdminAuthGuard } from 'src/infrastructure/common/guards/JwtAuthAdmin.guard';
import { JwtAdminAuthGuard } from '../../common/guards/JwtAuthAdmin.guard';
//import { UpdateTrafficLightDto } from 'src/infrastructure/common/dto/traffic-lights/update-traffic-light.dto';
import { UpdateTrafficLightDto } from '../../common/dto/traffic-lights/update-traffic-light.dto';
//import { UpdateTrafficLightUseCase } from 'src/usecases/traffic-lights/update-traffic-light.usecase';
import { UpdateTrafficLightUseCase } from '../../../usecases/traffic-lights/update-traffic-light.usecase';
//import { NearbyTrafficLightsDto } from 'src/infrastructure/common/dto/traffic-lights/nearby-traffic-lights.dto';
import { NearbyTrafficLightsDto } from '../../../infrastructure/common/dto/traffic-lights/nearby-traffic-lights.dto';
//import { GetNearbyTrafficLightsUseCase } from 'src/usecases/traffic-lights/get-nearby-traffic-lights.usecase';
import { GetNearbyTrafficLightsUseCase } from '../../../usecases/traffic-lights/get-nearby-traffic-lights.usecase';
//import { DeleteTrafficLightUseCase } from 'src/usecases/traffic-lights/delete-traffic-light.usecase';
import { DeleteTrafficLightUseCase } from '../../../usecases/traffic-lights/delete-traffic-light.usecase';

@Controller('api')
export class TrafficLightController {
  constructor(
    @Inject(UsecasesProxyModule.ReportTrafficLightUseCaseProxy)
    private readonly reportTrafficLightUseCase: UseCaseProxy<ReportTrafficLightUseCase>,
    @Inject(UsecasesProxyModule.FilterTrafficLightsUseCaseProxy)
    private readonly filterTrafficLightsUseCase: UseCaseProxy<FilterTrafficLightsUseCase>,
    @Inject(UsecasesProxyModule.CreateTrafficLightUseCaseProxy)
    private readonly createTrafficLightUseCase: UseCaseProxy<CreateTrafficLightUseCase>,
    @Inject(UsecasesProxyModule.UpdateTrafficLightUseCaseProxy)
    private readonly updateTrafficLightUseCase: UseCaseProxy<UpdateTrafficLightUseCase>,
    @Inject(UsecasesProxyModule.GetNearbyTrafficLightsUseCaseProxy)
    private readonly getTrafficLightsUseCase: UseCaseProxy<GetNearbyTrafficLightsUseCase>,
    @Inject(UsecasesProxyModule.DeleteTrafficLightUseCaseProxy)
    private readonly deleteTrafficLightUseCaseProxy: UseCaseProxy<DeleteTrafficLightUseCase>
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
  @Get('traffic-lights/nearby')
  async getNearbyTrafficLights(@Query() nearbyTrafficLightsDto: NearbyTrafficLightsDto) {
      return await this.getTrafficLightsUseCase.getInstance().execute(nearbyTrafficLightsDto);
  }

  @Post('traffic-lights')
  @UseGuards(JwtAdminAuthGuard)
  async create(@Body() createTrafficLightDto: CreateTrafficLightDto) {
    console.log('Solicitud recibida:', createTrafficLightDto); 
    return await this.createTrafficLightUseCase.getInstance().execute(createTrafficLightDto);
  }

  @Put(':id')
  @UseGuards(JwtAdminAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateTrafficLightDto: UpdateTrafficLightDto
  ) {
    return await this.updateTrafficLightUseCase.getInstance().execute(id, updateTrafficLightDto);
  }

  @Delete(':id')
  @UseGuards(JwtAdminAuthGuard)
  async delete(@Param('id') id: number) {
    return await this.deleteTrafficLightUseCaseProxy.getInstance().execute(id);
  }
}
