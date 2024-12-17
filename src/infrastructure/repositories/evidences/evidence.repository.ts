import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Evidence } from '../../entities/evidences/evidences.entity';
import { Report } from '../../entities/reports/report.entity';
//import { IEvidenceRepository } from 'src/domain/repositories/evidences/evidence.interface';
import { IEvidenceRepository } from '../../../domain/repositories/evidences/evidence.interface';
//import { EvidenceM, FileType } from 'src/domain/model/evidences/evidence';
import { EvidenceM, FileType } from '../../../domain/model/evidences/evidence';


@Injectable()
export class DatabaseEvidenceRepository implements IEvidenceRepository {
  constructor(
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}



  private isValidFileType(fileType: string): fileType is FileType {
    return Object.values(FileType).includes(fileType as FileType);
  }
  async createEvidence(filePath: string, fileType: string, reportId: number): Promise<EvidenceM> {
    const report = await this.reportRepository.findOne({
      where: { id: reportId },
      relations: ['user', 'trafficLight', 'evidences'],
    } as FindOneOptions<Report>);
    if (!report) {
      throw new Error('Report not found');
    }
    if (!this.isValidFileType(fileType)) {
      throw new Error('Invalid file type');
    }

    const evidence = new Evidence();
    evidence.file_path = filePath;
    evidence.file_type = fileType as FileType;
    evidence.report = report;
    await this.evidenceRepository.save(evidence);
    return new EvidenceM(
      evidence.id, 
      evidence.file_path, 
      evidence.file_type, 
      reportId, 
      evidence.uploaded_at);
  }
}
