import { ReportM } from "src/domain/model/reports/report";

export interface IReportRepository {
    createReport(reportData: ReportM): Promise<ReportM>;
    //findById(id: number): Promise<ReportM | undefined>;
    //findByUserId(userId: number): Promise<ReportM[]>;
    updateReport(reportData: ReportM): Promise<ReportM>;
    deleteReport(id: number): Promise<void>;
  }