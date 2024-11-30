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
exports.Report = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const trafficLight_entity_1 = require("../traffic-lights/trafficLight.entity");
const evidences_entity_1 = require("../evidences/evidences.entity");
let Report = class Report {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Report.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.reports),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Report.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => trafficLight_entity_1.TrafficLight, trafficLight => trafficLight.reports, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'traffic_light_id' }),
    __metadata("design:type", trafficLight_entity_1.TrafficLight)
], Report.prototype, "trafficLight", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: ['funcionando', 'dañado', 'intermitente'] }),
    __metadata("design:type", String)
], Report.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Report.prototype, "reported_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Report.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Report.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evidences_entity_1.Evidence, (evidence) => evidence.report),
    __metadata("design:type", Array)
], Report.prototype, "evidences", void 0);
Report = __decorate([
    (0, typeorm_1.Entity)('reports')
], Report);
exports.Report = Report;
//# sourceMappingURL=report.entity.js.map