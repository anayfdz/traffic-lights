import { Injectable } from '@nestjs/common';
import { EvidenceM, FileType } from 'src/domain/model/evidences/evidence';
import { DatabaseEvidenceRepository } from 'src/infrastructure/repositories/evidences/evidence.repository';

@Injectable()
export class CreateEvidenceUseCase {
  constructor(
    private readonly databaseEvidenceRepository: DatabaseEvidenceRepository,
  ) {}

  async execute(filePaths: string[], fileTypes: string[], reportId: number): Promise<EvidenceM[]> {
    const savedEvidences = [];

    for (let i = 0; i < filePaths.length; i++) {
      const filePath = filePaths[i];
      const fileType = this.convertToFileType(fileTypes[i]);

      const evidence = await this.databaseEvidenceRepository.createEvidence(filePath, fileType, reportId);
      savedEvidences.push(evidence);
    }

    return savedEvidences;
  }

  private convertToFileType(fileType: string): FileType {
    if (Object.values(FileType).includes(fileType as FileType)) {
      return fileType as FileType;
    } else {
      throw new Error(`Invalid file type: ${fileType}`);
    }
  }
}
