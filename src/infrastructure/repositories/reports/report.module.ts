import { Module } from '@nestjs/common';
import { DatabaseReportRepository } from './report.repository';

@Module({
imports: [
 ],
  providers: [DatabaseReportRepository],
  exports: [DatabaseReportRepository],
})
export class ReportModule {}
