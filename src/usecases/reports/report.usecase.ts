// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Report } from '../../entities/reports/report.entity';
// import { CreateReportDto } from '../../common/dto/report/create-report.dto';
// import { User } from '../../entities/users/user.entity';

// @Injectable()
// export class ReportTrafficLightUseCase {
//   constructor(
//     @InjectRepository(Report)
//     private readonly reportRepository: Repository<Report>,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   async execute(createReportDto: CreateReportDto, userId: number): Promise<Report> {
//     const user = await this.userRepository.findOne(userId);
//     if (!user) {
//       throw new Error('User not found');
//     }

//     const report = this.reportRepository.create({
//       ...createReportDto,
//       user,
//       reported_at: createReportDto.reported_at || new Date(),
//     });

//     return this.reportRepository.save(report);
//   }
// }
