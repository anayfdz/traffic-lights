"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceM = exports.FileType = void 0;
var FileType;
(function (FileType) {
    FileType["Image"] = "image";
    FileType["Video"] = "video";
})(FileType = exports.FileType || (exports.FileType = {}));
class EvidenceM {
    constructor(id, filePath, fileType, reportId, uploadedAt, createdAt) {
        this._id = id;
        this._filePath = filePath;
        this._fileType = fileType;
        this._uploaded_at = uploadedAt || new Date();
        this._reportId = reportId;
        this._createdAt = createdAt || new Date();
    }
    get id() {
        return this._id;
    }
    get filePath() {
        return this._filePath;
    }
    get fileType() {
        return this._fileType;
    }
    get createdAt() {
        return this._createdAt;
    }
    get reportId() {
        return this._reportId;
    }
    set filePath(value) {
        this._filePath = value;
    }
    set fileType(value) {
        this._fileType = value;
    }
    set reportId(value) {
        this._reportId = value;
    }
}
exports.EvidenceM = EvidenceM;
//# sourceMappingURL=evidence.js.map