import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/users/user.entity';
import { DatabaseUserRepository } from './users/user.repository';
import { OtpService} from './otps/otp.repository'
import { Otp } from '../entities/otps/otps.entity';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { MailModule } from 'src/usecases/otps/mail.module';
import { JwtConfigModule } from '../services/jwt/jwt.module';
import { DatabaseTrafficLightRepository } from './traffic-lights/traffic.repository';
import { ReportModule } from './reports/report.module';
import { DatabaseReportRepository } from './reports/report.repository';
import { TrafficLight } from '../entities/traffic-lights/trafficLight.entity';
import { Report } from '../entities/reports/report.entity';
import { Evidence } from '../entities/evidences/evidences.entity';
import { DatabaseEvidenceRepository } from './evidences/evidence.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User, Otp, Report, TrafficLight, Evidence]), MailModule, BcryptModule, JwtConfigModule],
  providers: [DatabaseUserRepository, OtpService, DatabaseReportRepository, DatabaseTrafficLightRepository, DatabaseEvidenceRepository],
  exports: [DatabaseUserRepository, OtpService, DatabaseReportRepository, DatabaseTrafficLightRepository, DatabaseEvidenceRepository],
})
export class RepositoriesModule {}
