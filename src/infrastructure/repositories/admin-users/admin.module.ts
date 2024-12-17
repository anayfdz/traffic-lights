import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { AdminUser } from 'src/infrastructure/entities/admin-users/adminUser.entity';
import { AdminUser } from '../../../infrastructure/entities/admin-users/adminUser.entity';
import { DatabaseAdminUserRepository } from './admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [DatabaseAdminUserRepository],
  exports: [DatabaseAdminUserRepository],
})
export class AdminModule {}
