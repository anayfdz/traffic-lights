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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseUserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_1 = require("../../../domain/model/users/user");
const user_entity_1 = require("../../entities/users/user.entity");
const otp_repository_1 = require("../otps/otp.repository");
const bcrypt_service_1 = require("../../../infrastructure/services/bcrypt/bcrypt.service");
const report_1 = require("../../../domain/model/reports/report");
const otp_1 = require("../../../domain/model/otps/otp");
const otps_entity_1 = require("../../entities/otps/otps.entity");
const evidences_entity_1 = require("../../entities/evidences/evidences.entity");
const evidence_1 = require("../../../domain/model/evidences/evidence");
const trafficLight_1 = require("../../../domain/model/traffic-lights/trafficLight");
const validate_email_dto_1 = require("../../common/dto/user/validate-email.dto");
const login_dto_1 = require("../../common/dto/auth/login.dto");
let DatabaseUserRepository = class DatabaseUserRepository {
    constructor(userEntityRepository, otpService, bcryptService) {
        this.userEntityRepository = userEntityRepository;
        this.otpService = otpService;
        this.bcryptService = bcryptService;
    }
    async registerUser(createUserDto) {
        const existingUser = await this.userEntityRepository.findOne({ where: { email: createUserDto.email } });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const userEntity = new user_entity_1.User();
        userEntity.name = createUserDto.name;
        userEntity.password = await this.bcryptService.hash(createUserDto.password);
        userEntity.nickname = createUserDto.nickname;
        userEntity.email = createUserDto.email;
        userEntity.status = 'pending_validation';
        const savedUser = await this.userEntityRepository.save(userEntity);
        await this.otpService.generateOtp(savedUser.id);
        return this.toUser(savedUser);
    }
    async getUserById(userId) {
        return await this.userEntityRepository.findOne({ where: { id: userId } });
    }
    async resendOtp(email) {
        const user = await this.userEntityRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        await this.otpService.generateOtp(user.id);
    }
    async getUserByUsername(username) {
        const adminUserEntity = await this.userEntityRepository.findOne({
            where: {
                username: username,
            },
        });
        if (!adminUserEntity) {
            return null;
        }
        return this.toUser(adminUserEntity);
    }
    async getUserByEmail(email) {
        const adminUserEntity = await this.userEntityRepository.findOne({
            where: {
                email,
            },
        });
        if (!adminUserEntity) {
            return null;
        }
        return true;
    }
    async validateEmailWithOtp(validateEmailDto) {
        const user = await this.userEntityRepository.findOne({ where: { email: validateEmailDto.email } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        const otpValid = await this.otpService.verifyOtp(user.id, validateEmailDto.otp_code);
        if (otpValid) {
            user.status = 'validated';
            await this.userEntityRepository.save(user);
            return true;
        }
        return false;
    }
    toUser(userEntity) {
        const userMInstance = new user_1.UserM(userEntity.id, userEntity.name, userEntity.last_name, userEntity.email, userEntity.password, userEntity.nickname, userEntity.status, userEntity.created_at, userEntity.updated_at, userEntity.reports.map((report) => this.toReport(report)), userEntity.otps.map((otp) => this.toOtp(otp)));
        return userMInstance;
    }
    toReport(reportEntity) {
        const trafficLightMInstance = reportEntity.trafficLight
            ? new trafficLight_1.TrafficLightM(reportEntity.trafficLight.id, reportEntity.trafficLight.latitude, reportEntity.trafficLight.longitude, reportEntity.trafficLight.type, reportEntity.trafficLight.department, reportEntity.trafficLight.province, reportEntity.trafficLight.district, reportEntity.trafficLight.created_at, reportEntity.trafficLight.updated_at, reportEntity.trafficLight.reports.map((report) => this.toReport(report)))
            : null;
        const status = report_1.Status[reportEntity.status];
        return new report_1.ReportM(reportEntity.id, this.toUser(reportEntity.user), trafficLightMInstance, reportEntity.description, status, reportEntity.comments, reportEntity.reported_at, reportEntity.created_at, reportEntity.updated_at, reportEntity.evidences.map((evidence) => this.toEvidence(evidence)));
    }
    toOtp(otpEntity) {
        return new otp_1.OtpM(otpEntity.id, otpEntity.user.id, otpEntity.otp_code, otpEntity.expires_at, otpEntity.created_at);
    }
    toEvidence(evidenceEntity) {
        const fileType = evidence_1.FileType[evidenceEntity.file_type];
        return new evidence_1.EvidenceM(evidenceEntity.id, evidenceEntity.file_path, fileType, evidenceEntity.report.id, evidenceEntity.uploaded_at);
    }
};
DatabaseUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        otp_repository_1.OtpService,
        bcrypt_service_1.BcryptService])
], DatabaseUserRepository);
exports.DatabaseUserRepository = DatabaseUserRepository;
//# sourceMappingURL=user.repository.js.map