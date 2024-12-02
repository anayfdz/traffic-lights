import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserM } from '../../../domain/model/users/user';
import { UserRepository } from '../../../domain/repositories/users/userRepository.interface';
import { User } from '../../entities/users/user.entity';
import { Report } from '../../entities/reports/report.entity';
import { OtpService } from '../otps/otp.repository';
import { RegisterUserDto } from '../../controllers/otps/register-user.dto';
import { BcryptService } from '../../../infrastructure/services/bcrypt/bcrypt.service';
import { CreateUserDto } from '../../common/dto/user/create-user.dto';
import { ReportM, Status } from 'src/domain/model/reports/report';
import { OtpM } from 'src/domain/model/otps/otp';
import { Otp } from 'src/infrastructure/entities/otps/otps.entity';
import { Evidence } from 'src/infrastructure/entities/evidences/evidences.entity';
import { EvidenceM, FileType } from 'src/domain/model/evidences/evidence';
import { TrafficLightM } from 'src/domain/model/traffic-lights/trafficLight';
import { ValidateEmailDto } from 'src/infrastructure/common/dto/user/validate-email.dto';
import { LoginDto } from 'src/infrastructure/common/dto/auth/login.dto';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
    private readonly otpService: OtpService,
    private readonly bcryptService: BcryptService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<UserM> {
    const existingUser = await this.userEntityRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    // Primero, creamos el nuevo usuario
    const userEntity = new User();
    userEntity.name = createUserDto.name;
    userEntity.last_name = createUserDto.last_name;
    userEntity.password = await this.bcryptService.hash(createUserDto.password);
    userEntity.nickname = createUserDto.nickname;
    userEntity.email = createUserDto.email;
    userEntity.status = 'pending_validation';

    const savedUser = await this.userEntityRepository.save(userEntity);

    // OTP para este usuario
    await this.otpService.generateOtp(savedUser.id);

    // Retornamos el usuario creado
    return this.toUser(savedUser);
  }

  // Obtener usuario por id

  async getUserById(userId: number): Promise<User> {
    return await this.userEntityRepository.findOne({ where: { id: userId } });
  }

  async resendOtp(email: string): Promise<void> { 
    const user = await this.userEntityRepository.findOne({ where: { email } });
     if (!user) { throw new Error('User not found'); 

     } 
     await this.otpService.generateOtp(user.id);
    }
  

    async getUserByUsername(username: string): Promise<UserM> {
      const adminUserEntity = await this.userEntityRepository.findOne({
        where: {
          username: username,
        } as FindOptionsWhere<User>,
      });
      if (!adminUserEntity) {
        return null;
      }
      return this.toUser(adminUserEntity);
    }
    async getUserByEmail(email: string): Promise<boolean> {
      const adminUserEntity = await this.userEntityRepository.findOne({
        where: {
          email,
        } as FindOptionsWhere<User>,
      });
      if (!adminUserEntity) {
        return null;
      }
      return true
    }

  // Validar usuario por correo electrónico
  async validateEmailWithOtp(validateEmailDto: ValidateEmailDto): Promise<boolean> {
    const user = await this.userEntityRepository.findOne({ where: { email: validateEmailDto.email } as FindOptionsWhere<User> });

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


  private toUser(userEntity: User): UserM {
    const userMInstance: UserM = new UserM(
      userEntity.id,
      userEntity.name,
      userEntity.last_name,
      userEntity.email,
      userEntity.password,
      userEntity.nickname,
      userEntity.status,
      userEntity.created_at,
      userEntity.updated_at,
      userEntity.reports.map((report) => this.toReport(report)),
      userEntity.otps.map((otp) => this.toOtp(otp)),
    );
    return userMInstance;
  }

  private toReport(reportEntity: Report): ReportM {
    const trafficLightMInstance: TrafficLightM | null = reportEntity.trafficLight
      ? new TrafficLightM(
          reportEntity.trafficLight.id,
          reportEntity.trafficLight.latitude,
          reportEntity.trafficLight.longitude,
          reportEntity.trafficLight.type,
          reportEntity.trafficLight.department,
          reportEntity.trafficLight.province,
          reportEntity.trafficLight.district,
          reportEntity.trafficLight.created_at,
          reportEntity.trafficLight.updated_at,
          reportEntity.trafficLight.reports.map((report) => this.toReport(report)),
        )
      : null;
    //const userInstance = new UserM(reportEntity.user.id)
    const status = Status[reportEntity.status as keyof typeof Status];
      
    return new ReportM(
      reportEntity.id,
      this.toUser(reportEntity.user),
      trafficLightMInstance,
      reportEntity.description,
      status,
      reportEntity.comments,
      reportEntity.reported_at,
      reportEntity.created_at,
      reportEntity.updated_at,
      reportEntity.evidences.map((evidence) => this.toEvidence(evidence)),
    );
  }

  private toOtp(otpEntity: Otp): OtpM {
    return new OtpM(
      otpEntity.id, 
      otpEntity.user.id, 
      otpEntity.otp_code, 
      otpEntity.expires_at, 
      otpEntity.created_at);
  }

  private toEvidence(evidenceEntity: Evidence): EvidenceM {
    const fileType = FileType[evidenceEntity.file_type as keyof typeof FileType];
    return new EvidenceM(
      evidenceEntity.id, 
      evidenceEntity.file_path, 
      fileType,
      evidenceEntity.report.id,
      evidenceEntity.uploaded_at,
    );
}
}
