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
exports.TrafficLight = void 0;
const typeorm_1 = require("typeorm");
const report_entity_1 = require("../reports/report.entity");
let TrafficLight = class TrafficLight {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], TrafficLight.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], TrafficLight.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], TrafficLight.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: ['vehicular', 'peatonal', 'mixto'] }),
    __metadata("design:type", String)
], TrafficLight.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], TrafficLight.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], TrafficLight.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, nullable: true }),
    __metadata("design:type", String)
], TrafficLight.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], TrafficLight.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], TrafficLight.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_entity_1.Report, (report) => report.trafficLight),
    __metadata("design:type", Array)
], TrafficLight.prototype, "reports", void 0);
TrafficLight = __decorate([
    (0, typeorm_1.Entity)('traffic_lights')
], TrafficLight);
exports.TrafficLight = TrafficLight;
//# sourceMappingURL=trafficLight.entity.js.map