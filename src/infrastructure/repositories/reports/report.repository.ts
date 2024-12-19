//import { Report } from 'src/infrastructure/entities/reports/report.entity';
import { Report } from '../../../infrastructure/entities/reports/report.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { IReportRepository } from 'src/domain/repositories/reports/reportRepository.interface';
import { IReportRepository } from '../../../domain/repositories/reports/reportRepository.interface';
//import { TrafficLight } from 'src/infrastructure/entities/traffic-lights/trafficLight.entity';
import { TrafficLight } from '../../../infrastructure/entities/traffic-lights/trafficLight.entity';
//import { User } from 'src/infrastructure/entities/users/user.entity';
import { User } from '../../../infrastructure/entities/users/user.entity';
//import { Evidence } from 'src/infrastructure/entities/evidences/evidences.entity';
import { Evidence } from '../../../infrastructure/entities/evidences/evidences.entity';
import { ReportM, Status } from '../../../domain/model/reports/report';
//import { UserM } from 'src/domain/model/users/user';
import { UserM } from '../../../domain/model/users/user';
//import { EvidenceM, FileType } from 'src/domain/model/evidences/evidence';
import { EvidenceM, FileType } from '../../../domain/model/evidences/evidence';
//import { TrafficLightM } from 'src/domain/model/traffic-lights/trafficLight';
import { TrafficLightM } from '../../../domain/model/traffic-lights/trafficLight';


@Injectable()
export class DatabaseReportRepository implements IReportRepository {
constructor(
    @InjectRepository(Report)
    private readonly reportEntityRepository: Repository<Report>,
    @InjectRepository(TrafficLight)
    private readonly trafficLightEntityRepository: Repository<TrafficLight>,
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
    @InjectRepository(Evidence)
    private readonly evidenceEntityRepository: Repository<Evidence>
) {}
  async createReport(reportData: ReportM): Promise<ReportM> {
    const userEntity = await this.userEntityRepository.findOne({ where: { id: reportData.user.id } });
    const trafficLightEntity = reportData.trafficLight
      ? await this.trafficLightEntityRepository.findOne({ where: { id: reportData.trafficLight.id } })
      : null;

    const reportEntity = new Report();
    reportEntity.user = userEntity;
    reportEntity.trafficLight = trafficLightEntity;
    reportEntity.status = reportData.status as Status;
    reportEntity.comments = reportData.comments;
    reportEntity.reported_at = reportData.reported_at;
    reportEntity.description = reportData.description;
    const savedReport = await this.reportEntityRepository.save(reportEntity);

    // Guardar las evidencias asociadas al reporte
    if (reportData.evidences.length > 0) {
      for (const evidenceM of reportData.evidences) {
        const evidenceEntity = new Evidence();
        evidenceEntity.file_path = evidenceM.filePath;
        evidenceEntity.file_type = evidenceM.fileType;
        evidenceEntity.report = savedReport;
        evidenceEntity.uploaded_at = evidenceM.uploadedAt;

        await this.evidenceEntityRepository.save(evidenceEntity);
      }
    }

    return this.toReportM(savedReport) as ReportM;
    
  }

  async findReportById(id: number): Promise<ReportM | null> {
    const reportEntity = await this.reportEntityRepository.findOne({
      where: { id },
      relations: ['user', 'trafficLight', 'evidences'],
    });
    if (!reportEntity) {
      return null;
    }
    return this.toReportM(reportEntity) as ReportM;
  }

  // async findReports(filters: any): Promise<Report[]> {
  //   const filterReports = await this.reportEntityRepository.find({
  //     where: filters,
  //   })
  //   return filterReports
  // }


  async findReportsByUserId(userId: number): Promise<ReportM[]> {
    const findReports = await this.reportEntityRepository.find({
      where: { user: {id: userId} },
      relations: ['user', 'trafficLight', 'evidences'],
    });
    return this.toReportM(findReports) as ReportM[];
  }


  async updateReport(reportData: ReportM): Promise<ReportM> {
    const reportEntity = await this.reportEntityRepository.findOne({ where: { id: reportData.id } });
    if (!reportEntity) {
      throw new Error('Report not found');
    }

    reportEntity.status = reportData.status;
    reportEntity.comments = reportData.comments;
    reportEntity.reported_at = reportData.reported_at;
    reportEntity.description = reportData.description;

    const updatedReport = await this.reportEntityRepository.save(reportEntity);
    return this.toReportM(updatedReport) as ReportM;
  }


  async deleteReport(id: number): Promise<void> {
    const reportEntity = await this.reportEntityRepository.findOne({ where: { id } });
    if (!reportEntity) {
      throw new Error('Report not found');
    }

    await this.reportEntityRepository.remove(reportEntity);
  }

  private toReportM(reportEntity: Report | Report[]): ReportM | ReportM[] {
    if (Array.isArray(reportEntity)) {
      return reportEntity.map((report) => this.toReportM(report) as ReportM);
    } else{
    const location =reportEntity.trafficLight && reportEntity.trafficLight.location ?
    {
      latitude: reportEntity.trafficLight.location.coordinates[1],
      longitude: reportEntity.trafficLight.location.coordinates[0]
    } : { latitude: 0, longitude: 0 };
    const trafficLightMInstance: TrafficLightM | null = reportEntity.trafficLight
      ? new TrafficLightM(
          reportEntity.trafficLight.id,
          reportEntity.trafficLight.latitude,
          reportEntity.trafficLight.longitude,
          reportEntity.trafficLight.type,
          reportEntity.trafficLight.department,
          reportEntity.trafficLight.province,
          reportEntity.trafficLight.district,
          location,
          reportEntity.trafficLight.created_at,
          reportEntity.trafficLight.updated_at,
          [],
        )
      : null;

    const status = Status[reportEntity.status as keyof typeof Status];
    const evidences = reportEntity.evidences?.map(evidenceEntity => this.toEvidence(evidenceEntity)) || [];
    console.log(evidences, 'aqui arreglo')

    return new ReportM(
      reportEntity.id,
      this.toUser(reportEntity.user),
      trafficLightMInstance,
      reportEntity.description,
      status,
      reportEntity.comments,
      reportEntity.reported_at,
      reportEntity.created_at,
      reportEntity.updated_at,
      evidences
    );
  }
}

  private toUser(userEntity: User): UserM {
    return new UserM(
      userEntity.id,
      userEntity.name,
      userEntity.last_name,
      userEntity.email,
      userEntity.password,
      userEntity.nickname,
      userEntity.status,
      userEntity.created_at,
      userEntity.updated_at,
      [],
    );
  }

  private toEvidence(evidenceEntity: Evidence): EvidenceM {
    const fileType = this.convertToFileType(evidenceEntity.file_type);
    const reportId = evidenceEntity.report ? evidenceEntity.report.id : null;
    return new EvidenceM(
      evidenceEntity.id,
      evidenceEntity.file_path,
      fileType,
      reportId,
      evidenceEntity.uploaded_at,
    );
  }
  private convertToFileType(fileType: string): FileType {
    if (Object.values(FileType).includes(fileType as FileType)) {
      return fileType as FileType;
    } else {
      throw new Error(`Invalid file type: ${fileType}`);
    }
  }
}
