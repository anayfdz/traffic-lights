import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evidence } from '../../entities/evidences/evidences.entity';  // Ajusta la ruta según corresponda

@Injectable()
export class DatabaseEvidenceRepository {
  constructor(
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
  ) {}

  async createEvidence(filePath: string, fileType: string) {
    const evidence = new Evidence();
    evidence.file_path = filePath;
    evidence.file_type = fileType;
    return await this.evidenceRepository.save(evidence);
  }
}
