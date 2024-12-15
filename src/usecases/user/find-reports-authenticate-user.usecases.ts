import { Injectable } from '@nestjs/common';
import { DatabaseReportRepository } from 'src/infrastructure/repositories/reports/report.repository';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/users/user.repository';

@Injectable()
export class FindReportsUserUseCase {
  constructor(
    private readonly userRepository: DatabaseUserRepository,
    private readonly reportRepository: DatabaseReportRepository,
  ) {}

  async execute(userId: number): Promise<any> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const reports = await this.reportRepository.findReportsByUserId(userId);
    return reports;
  }
}
