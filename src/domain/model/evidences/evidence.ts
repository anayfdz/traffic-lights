export enum FileType {
    Image = 'image',
    Video = 'video'
}

export class EvidenceM {
  private _id: number;
  private _filePath: string;
  private _fileType: FileType;
  private _uploaded_at: Date
  private _createdAt: Date;
  private _reportId: number;
 

  constructor(id: number, filePath: string, fileType: FileType, reportId: number, uploadedAt: Date, createdAt?: Date,) {
    this._id = id;
    this._filePath = filePath;
    this._fileType = fileType;
    this._uploaded_at = uploadedAt || new Date();
    this._reportId = reportId;
    this._createdAt = createdAt || new Date();
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get filePath(): string {
    return this._filePath;
  }

  get fileType(): FileType {
    return this._fileType;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get reportId(): number {
    return this._reportId;
  }

  set filePath(value: string) {
    this._filePath = value;
  }

  set fileType(value: FileType) {
    this._fileType = value;
  }

  set reportId(value: number) {
    this._reportId = value;
  }
  get uploadedAt(): Date {
    return this._uploaded_at;
  }
  set uploadedAt(value: Date) {
    this._uploaded_at = value;
  }
}
