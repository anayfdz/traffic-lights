import { Module } from '@nestjs/common';
//import { EvidenceModule } from 'src/infrastructure/repositories/evidences/evidence.module';
import { EvidenceModule } from '../../infrastructure/repositories/evidences/evidence.module';
import { CreateEvidenceUseCase } from './createEvidences.usecases';

@Module({
  imports: [EvidenceModule],
  providers: [CreateEvidenceUseCase],
  exports: [CreateEvidenceUseCase],
})
export class EvidencesUseCasesModule {}
