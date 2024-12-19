// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Report } from '../../infrastructure/entities/reports/report.entity';
// import { User } from '../../infrastructure/entities/users/user.entity';
// import { IReportRepository } from '../../domain/repositories/reports/reportRepository.interface';
// import { UserRepository } from '../../domain/repositories/users/userRepository.interface';
// import { ReportM } from 'src/domain/model/reports/report';

// @Injectable()
// export class GetUserReportsUseCase {
//   constructor(
//     private readonly userRepository: UserRepository,
//   ) {}

//   async execute(userId: number): Promise<ReportM[]> {
//     const user = await this.userRepository.findOneUser(userId);
//     if (!user) {
//       throw new Error('User not found');
//     }

//     return user.reports;
//   }
// }
