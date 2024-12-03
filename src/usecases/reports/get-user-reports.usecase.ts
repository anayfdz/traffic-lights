// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Report } from '../../infrastructure/entities/reports/report.entity';
// import { User } from '../../infrastructure/entities/users/user.entity';

// @Injectable()
// export class GetUserReportsUseCase {
//   constructor(
//     @InjectRepository(Report)
//     private readonly reportRepository: Repository<Report>,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   async execute(userId: number): Promise<Report[]> {
//     const user = await this.userRepository.findOne(userId, { relations: ['reports'] });
//     if (!user) {
//       throw new Error('User not found');
//     }

//     return user.reports;
//   }
// }
