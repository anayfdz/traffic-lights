"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evidence = void 0;
const typeorm_1 = require("typeorm");
const report_entity_1 = require("../reports/report.entity");
let Evidence = class Evidence {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Evidence.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => report_entity_1.Report, report => report.evidences),
    (0, typeorm_1.JoinColumn)({ name: 'report_id' }),
    __metadata("design:type", report_entity_1.Report)
], Evidence.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Evidence.prototype, "file_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['image', 'video'] }),
    __metadata("design:type", String)
], Evidence.prototype, "file_type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Evidence.prototype, "uploaded_at", void 0);
Evidence = __decorate([
    (0, typeorm_1.Entity)('evidences')
], Evidence);
exports.Evidence = Evidence;
//# sourceMappingURL=evidences.entity.js.map