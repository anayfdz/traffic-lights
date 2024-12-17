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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrafficLight } from 'src/infrastructure/entities/traffic-lights/trafficLight.entity';
import { TrafficLightM } from 'src/domain/model/traffic-lights/trafficLight';

@ApiTags('traffic-lights')
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reportar el estado de un semáforo' })
  @ApiBody({
    description: 'Reporte del semáforo, incluyendo su estado, ubicación, y evidencias',
    type: CreateReportDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Reporte creado con éxito',
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta, datos inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado, se requiere autenticación',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
  })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Filter traffic lights by district, province, and department' })
  @ApiQuery({
    name: 'district',
    required: true,
    description: 'The district of the traffic light (e.g., Miraflores)',
    type: String,
  })
  @ApiQuery({
    name: 'province',
    required: true,
    description: 'The province where the traffic light is located (e.g., Lima)',
    type: String,
  })
  @ApiQuery({
    name: 'department',
    required: true,
    description: 'The department where the traffic light is located (e.g., Lima)',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Filtered list of traffic lights',
    type: [TrafficLightM],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async filterTrafficLights(@Query() filterTrafficLightsDto: FilterTrafficLightsDto) {
    console.log('DTO recibido:', filterTrafficLightsDto);
    return await this.filterTrafficLightsUseCase
      .getInstance()
      .execute(filterTrafficLightsDto.department, filterTrafficLightsDto.province, filterTrafficLightsDto.district);
  }

 

  @Get('traffic-lights/nearby')
  @ApiOperation({ description: 'Obtener semáforos cercanos' })
  @ApiQuery({ name: 'latitude', type: 'number', description: 'Latitud del punto central para la búsqueda', required: true })
  @ApiQuery({ name: 'longitude', type: 'number', description: 'Longitud del punto central para la búsqueda', required: true })
  @ApiQuery({ name: 'radius', type: 'number', description: 'Radio en kilómetros para la búsqueda', required: true })
  @ApiResponse({
    status: 200,
    description: 'Listado de semáforos cercanos',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'number' },
          _latitude: { type: 'number' },
          _longitude: { type: 'number' },
          _type: { type: 'string' },
          _department: { type: 'string' },
          _province: { type: 'string' },
          _district: { type: 'string' },
          _location: {
            type: 'object',
            properties: {
              latitude: { type: 'number' },
              longitude: { type: 'number' }
            }
          },
          _createdAt: { type: 'string', format: 'date-time' },
          _updatedAt: { type: 'string', format: 'date-time' },
          _reports: { type: 'array', items: { type: 'object' } }
        }
      }
    }
  })
  async getNearbyTrafficLights(@Query() nearbyTrafficLightsDto: NearbyTrafficLightsDto) {
      return await this.getTrafficLightsUseCase.getInstance().execute(nearbyTrafficLightsDto);
  }

  @Post('traffic-lights')
  @UseGuards(JwtAdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new traffic light' })
  @ApiBody({
    description: 'Details of the traffic light to be created',
    type: CreateTrafficLightDto,
  })
  @ApiResponse({ status: 201, description: 'Traffic light created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
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
