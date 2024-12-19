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
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { ReportTrafficLightUseCase } from '../../../usecases/reports/create-report-traffic-light.usecase';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { FilterTrafficLightsUseCase } from '../../../usecases/traffic-lights/filter-traffic-lights.usecases';
import { CreateTrafficLightUseCase } from '../../../usecases/traffic-lights/create-traffic-light.usecase';
import { JwtAdminAuthGuard } from '../../common/guards/JwtAuthAdmin.guard';
import { UpdateTrafficLightUseCase } from '../../../usecases/traffic-lights/update-traffic-light.usecase';
import { GetNearbyTrafficLightsUseCase } from '../../../usecases/traffic-lights/get-nearby-traffic-lights.usecase';
import { DeleteTrafficLightUseCase } from '../../../usecases/traffic-lights/delete-traffic-light.usecase';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { AssignReportUseCase } from 'src/usecases/reports/assign-report.usecase';
// import { DeleteReportUseCase } from 'src/usecases/reports/delete-report.usecase';
import { GetReportDetailsUseCase } from 'src/usecases/reports/get-detail-report.usecase';
// import { ResolveReportUseCase } from 'src/usecases/reports/resolve-report.usecase';
import { UpdateReportStatusDto } from 'src/infrastructure/common/dto/report/update-report.dto';
import { ReportM } from '../../../domain/model/reports/report';
import { GetUserReportsUseCase } from 'src/usecases/reports/get-user-reports.usecase';

@ApiTags('reports')
@Controller('api/admin/reports')
export class ReportController {
  constructor(
    // @Inject(UsecasesProxyModule.ReportTrafficLightUseCaseProxy)
    // private readonly reportTrafficLightUseCase: UseCaseProxy<ReportTrafficLightUseCase>,
    // @Inject(UsecasesProxyModule.FilterTrafficLightsUseCaseProxy)
    // private readonly filterTrafficLightsUseCase: UseCaseProxy<FilterTrafficLightsUseCase>,
    // @Inject(UsecasesProxyModule.CreateTrafficLightUseCaseProxy)
    // private readonly createTrafficLightUseCase: UseCaseProxy<CreateTrafficLightUseCase>,
    // @Inject(UsecasesProxyModule.UpdateTrafficLightUseCaseProxy)
    // private readonly updateTrafficLightUseCase: UseCaseProxy<UpdateTrafficLightUseCase>,
    // @Inject(UsecasesProxyModule.GetNearbyTrafficLightsUseCaseProxy)
    // private readonly getTrafficLightsUseCase: UseCaseProxy<GetNearbyTrafficLightsUseCase>,
    // @Inject(UsecasesProxyModule.DeleteTrafficLightUseCaseProxy)
    // private readonly deleteTrafficLightUseCase: UseCaseProxy<DeleteTrafficLightUseCase>,
    // @Inject(UsecasesProxyModule.AssignReportUseCaseProxy)
    // private readonly assignReportUseCase: UseCaseProxy<AssignReportUseCase>,
    // @Inject(UsecasesProxyModule.DeleteReportUseCaseProxy)
    // private readonly deleteReportUseCase: UseCaseProxy<DeleteReportUseCase>,
    @Inject(UsecasesProxyModule.GetReportDetailsUseCaseProxy)
    private readonly getReportDetailsUseCase: UseCaseProxy<GetReportDetailsUseCase>,
    @Inject(UsecasesProxyModule.GetUserReportsUseCaseProxy)
    private readonly getUserReportsUseCase: UseCaseProxy<GetUserReportsUseCase>,
    // @Inject(UsecasesProxyModule.ResolveReportUseCaseProxy)
    // private readonly resolveReportUseCase: UseCaseProxy<ResolveReportUseCase>
  ) {}

  @Get()
  @UseGuards(JwtAdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ver todos los reportes realizados por los usuarios' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por estado (opcional)',
    type: String,
  })
  @ApiQuery({
    name: 'department',
    required: false,
    description: 'Filtrar por departamento (opcional)',
    type: String,
  })
  @ApiQuery({
    name: 'province',
    required: false,
    description: 'Filtrar por provincia (opcional)',
    type: String,
  })
  @ApiQuery({
    name: 'district',
    required: false,
    description: 'Filtrar por distrito (opcional)',
    type: String,
  })
  @ApiQuery({
    name: 'date_range',
    required: false,
    description: 'Filtrar por rango de fechas (opcional)',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reportes obtenida exitosamente',
    type: [ReportM],
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async getAllReports(@Query() query: any) {
    return await this.getUserReportsUseCase.getInstance().execute(query);
  }

  @Get(':id')
  @UseGuards(JwtAdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ver detalles de un reporte específico' })
  @ApiResponse({
    status: 200,
    description: 'Detalles del reporte obtenidos con éxito',
    type: ReportM,
  })
  @ApiResponse({
    status: 404,
    description: 'Reporte no encontrado',
  })
  async getReportDetails(@Param('id') id: number) {
    return await this.getReportDetailsUseCase.getInstance().execute(id)
  }

//   // Endpoint para marcar un reporte como resuelto
//   @Put(':id/resolve')
//   @UseGuards(JwtAdminAuthGuard)
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Marcar un reporte como resuelto' })
//   @ApiResponse({
//     status: 200,
//     description: 'Reporte marcado como resuelto con éxito',
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Estado no válido',
//   })
//   async resolveReport(
//     @Param('id') id: number,
//     @Body() updateReportStatusDto: UpdateReportStatusDto,
//   ) {
//     return await this.resolveReportUseCase.getInstance().execute(id, updateReportStatusDto);
//   }

//   // Endpoint para asignar un reporte a un semáforo específico
//   @Put(':id/assign')
//   @UseGuards(JwtAdminAuthGuard)
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Asignar un reporte a un semáforo específico' })
//   @ApiResponse({
//     status: 200,
//     description: 'Reporte asignado a semáforo con éxito',
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Semáforo no encontrado',
//   })
//   async assignReport(
//     @Param('id') id: number,
//     @Body() assignReportDto: { traffic_light_id: number },
//   ) {
//     return await this.assignReportUseCase.getInstance().execute(id, assignReportDto.traffic_light_id);
//   }

//   // Endpoint para eliminar un reporte específico
//   @Delete(':id')
//   @UseGuards(JwtAdminAuthGuard)
//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Eliminar un reporte específico' })
//   @ApiResponse({
//     status: 200,
//     description: 'Reporte eliminado con éxito',
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Reporte no encontrado',
//   })
//   async deleteReport(@Param('id') id: number) {
//     return await this.deleteReportUseCase.getInstance().execute(id);
//   }
// }
}