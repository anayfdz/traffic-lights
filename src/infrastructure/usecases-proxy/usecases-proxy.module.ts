import { DynamicModule, Module } from '@nestjs/common';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtConfigModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabaseUserRepository } from '../repositories/users/user.repository';
import { OtpService } from '../repositories/otps/otp.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';
import { MailModule } from 'src/usecases/otps/mail.module';
import { RegisterUserUseCase } from 'src/usecases/user/register-user.usecases';
import { ValidateEmailUsecases } from 'src/usecases/user/validate-email.usecases';
import { ExternalService } from '../repositories/users/external-service/external.service';
import { ExternalModule } from '../repositories/users/external-service/external.module';
import { DatabaseReportRepository } from '../repositories/reports/report.repository';
import { ReportTrafficLightUseCase } from 'src/usecases/reports/create-report-traffic-light.usecase';
import { DatabaseTrafficLightRepository } from '../repositories/traffic-lights/traffic.repository';
import { CreateTrafficLightUseCase } from 'src/usecases/traffic-lights/create-traffic-light.usecase';

import { TrafficUseCasesModule } from 'src/usecases/traffic-lights/traffic.module';
import { EvidencesUseCasesModule } from 'src/usecases/evidences/evidence-usecases.module';
import { DatabaseEvidenceRepository } from '../repositories/evidences/evidence.repository';
import { CreateEvidenceUseCase } from 'src/usecases/evidences/createEvidences.usecases';
import { AdminUserModule } from 'src/usecases/admin-users/admin-user.module';
import { DatabaseAdminUserRepository } from '../repositories/admin-users/admin.repository';
import { LoginAdminUseCases } from 'src/usecases/admin-users/login-admin.usecases';
import { FindReportsUserUseCase } from 'src/usecases/user/find-reports-authenticate-user.usecases';
import { FilterTrafficLightsUseCase } from 'src/usecases/traffic-lights/filter-traffic-lights.usecases';
import { UpdateTrafficLightUseCase } from 'src/usecases/traffic-lights/update-traffic-light.usecase';
import { GetNearbyTrafficLightsUseCase } from 'src/usecases/traffic-lights/get-nearby-traffic-lights.usecase';

@Module({
  imports: [
    LoggerModule,
    JwtConfigModule,
    BcryptModule,
    MailModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
    ExternalModule,
    TrafficUseCasesModule,
    EvidencesUseCasesModule,
    AdminUserModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
  // Users
  static RESEND_USECASES_PROXY = 'ResendOtpUsecasesProxy';
  static REGISTER_USECASES_PROXY = 'RegisterUseCasesProxy';
  static VALIDATE_USECASES_EMAIL_PROXY = 'ValidateEmailUsecasesProxy';
  static FIND_REPORTS_USERS_USECASES_PROXY = 'FindReportsUsersUsecasesProxy';

  // mail
  static MAIL_SERVICE = 'MailModule';

  // report
  static ReportTrafficLightUseCaseProxy = 'ReportTrafficLightUseCaseProxy';

  // trafic
  static CreateTrafficLightUseCaseProxy = 'CreateTrafficLightUseCaseProxy';
  static FilterTrafficLightsUseCaseProxy = 'FilterTrafficLightsUseCaseProxy';
  static UpdateTrafficLightUseCaseProxy = 'UpdateTrafficLightUseCaseProxy';
  static GetNearbyTrafficLightsUseCaseProxy = 'GetNearbyTrafficLightsUseCaseProxy'
  // evidence
  static EvidencesUseCasesProxy = 'EvidencesUseCasesProxy';
  // admin
  static AdminUserUseCasesProxy = 'AdminUserUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, OtpService, BcryptService],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            otpRepo: OtpService,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.RESEND_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [DatabaseUserRepository, ExternalService],
          provide: UsecasesProxyModule.REGISTER_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository, externalService: ExternalService) =>
            new UseCaseProxy(new RegisterUserUseCase(userRepo, externalService)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.VALIDATE_USECASES_EMAIL_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new ValidateEmailUsecases(userRepo)),
        },
        {
          inject: [DatabaseUserRepository, DatabaseReportRepository],
          provide: UsecasesProxyModule.FIND_REPORTS_USERS_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository, reportRepo: DatabaseReportRepository) =>
            new UseCaseProxy(new FindReportsUserUseCase(userRepo, reportRepo)),
        },
        // mail service
        {
          inject: [OtpService],
          provide: UsecasesProxyModule.MAIL_SERVICE,
          useFactory: () => new UseCaseProxy(new MailModule()),
        },
        // Report
        {
          inject: [DatabaseReportRepository, DatabaseTrafficLightRepository, CreateTrafficLightUseCase, CreateEvidenceUseCase],
          provide: UsecasesProxyModule.ReportTrafficLightUseCaseProxy,
          useFactory: (
            reportRepo: DatabaseReportRepository,
            trafficLight: DatabaseTrafficLightRepository,
            createTrafficLightUseCase: CreateTrafficLightUseCase,
            createEvidenceUseCase: CreateEvidenceUseCase,
          ) =>
            new UseCaseProxy(
              new ReportTrafficLightUseCase(reportRepo, trafficLight, createTrafficLightUseCase, createEvidenceUseCase),
            ),
        },
        // traffic
        {
          inject: [DatabaseTrafficLightRepository],
          provide: UsecasesProxyModule.CreateTrafficLightUseCaseProxy,
          useFactory: (trafficLight: DatabaseTrafficLightRepository) =>
            new UseCaseProxy(new CreateTrafficLightUseCase(trafficLight)),
        },
        {
          inject: [DatabaseTrafficLightRepository],
          provide: UsecasesProxyModule.FilterTrafficLightsUseCaseProxy,
          useFactory: (trafficLight: DatabaseTrafficLightRepository) =>
            new UseCaseProxy(new FilterTrafficLightsUseCase(trafficLight)),
        },
        {
          inject: [DatabaseTrafficLightRepository],
          provide: UsecasesProxyModule.UpdateTrafficLightUseCaseProxy,
          useFactory: (trafficLight: DatabaseTrafficLightRepository) =>
            new UseCaseProxy(new UpdateTrafficLightUseCase(trafficLight)),
        },
        {
          inject: [DatabaseTrafficLightRepository],
          provide: UsecasesProxyModule.GetNearbyTrafficLightsUseCaseProxy,
          useFactory: (trafficLight: DatabaseTrafficLightRepository) =>
            new UseCaseProxy(new GetNearbyTrafficLightsUseCase(trafficLight))
        },
        // evidence
        {
          inject: [DatabaseEvidenceRepository],
          provide: UsecasesProxyModule.EvidencesUseCasesProxy,
          useFactory: () => new UseCaseProxy(new EvidencesUseCasesModule()),
        },
        // admin
        {
          inject: [DatabaseAdminUserRepository, JwtTokenService, BcryptService, LoggerService],
          provide: UsecasesProxyModule.AdminUserUseCasesProxy,
          useFactory: (
            admin: DatabaseAdminUserRepository,
            token: JwtTokenService,
            bcrypt: BcryptService,
            logger: LoggerService,
          ) => new UseCaseProxy(new LoginAdminUseCases(admin, token, bcrypt, logger)),
        },
      ],
      exports: [
        UsecasesProxyModule.RESEND_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.MAIL_SERVICE,
        UsecasesProxyModule.REGISTER_USECASES_PROXY,
        UsecasesProxyModule.VALIDATE_USECASES_EMAIL_PROXY,
        UsecasesProxyModule.ReportTrafficLightUseCaseProxy,
        UsecasesProxyModule.CreateTrafficLightUseCaseProxy,
        UsecasesProxyModule.EvidencesUseCasesProxy,
        UsecasesProxyModule.AdminUserUseCasesProxy,
        UsecasesProxyModule.FIND_REPORTS_USERS_USECASES_PROXY,
        UsecasesProxyModule.FilterTrafficLightsUseCaseProxy,
        UsecasesProxyModule.UpdateTrafficLightUseCaseProxy,
        UsecasesProxyModule.GetNearbyTrafficLightsUseCaseProxy,
      ],
    };
  }
}
