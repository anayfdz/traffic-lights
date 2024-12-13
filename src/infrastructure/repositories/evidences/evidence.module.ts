import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseEvidenceRepository } from './evidence.repository';
import { Evidence } from 'src/infrastructure/entities/evidences/evidences.entity';
import { Report } from 'src/infrastructure/entities/reports/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evidence, Report])],
  providers: [DatabaseEvidenceRepository],
  exports: [DatabaseEvidenceRepository],
})
export class EvidenceModule {}
