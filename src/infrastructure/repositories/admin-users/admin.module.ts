import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evidence } from 'src/infrastructure/entities/evidences/evidences.entity';
import { AdminUser } from 'src/infrastructure/entities/admin-users/adminUser.entity';
import { DatabaseAdminUserRepository } from './admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [DatabaseAdminUserRepository],
  exports: [DatabaseAdminUserRepository],
})
export class AdminModule {}
