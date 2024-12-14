import { AdminUserM } from 'src/domain/model/admin-users/adminUser';
import { LoginAdminDto } from 'src/infrastructure/common/dto/admin-user/login-admin.dto';

export interface IAdminUserRepository {
  findByEmail(email: string): Promise<AdminUserM | null>;
  findOneById(id: number): Promise<AdminUserM | null>;
  create(admin: AdminUserM): Promise<AdminUserM>; 
  createAdmin(createAdminDto: CreateAdminDto): Promise<AdminUserM>;
  findAdminByEmail(email: string): Promise<AdminUserM | undefined>;        
  update(id: number, admin: AdminUserM): Promise<AdminUserM>;
  delete(id: number): Promise<void>;
  validateAdminCredentials(loginAdminDto: LoginAdminDto): Promise<AdminUserM | null>;
}
