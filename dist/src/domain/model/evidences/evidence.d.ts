export declare enum FileType {
    Image = "image",
    Video = "video"
}
export declare class EvidenceM {
    private _id;
    private _filePath;
    private _fileType;
    private _uploaded_at;
    private _createdAt;
    private _reportId;
    constructor(id: number, filePath: string, fileType: FileType, reportId: number, uploadedAt: Date, createdAt?: Date);
    get id(): number;
    get filePath(): string;
    get fileType(): FileType;
    get createdAt(): Date;
    get reportId(): number;
    set filePath(value: string);
    set fileType(value: FileType);
    set reportId(value: number);
}
