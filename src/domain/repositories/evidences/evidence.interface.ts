import { EvidenceM, FileType } from "src/domain/model/evidences/evidence";

export interface IEvidenceRepository {
    createEvidence(filePath: string, fileType: string, reportId: number): Promise<EvidenceM>
}