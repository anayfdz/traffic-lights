import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IAdminUserRepository } from 'src/domain/repositories/admin-users/adminUser.interface';
import { AdminUser } from 'src/infrastructure/entities/admin-users/adminUser.entity';
import { LoginAdminDto } from 'src/infrastructure/common/dto/admin-user/login-admin.dto';
import { AdminUserM, Roles } from 'src/domain/model/admin-users/adminUser';

@Injectable()
export class DatabaseAdminUserRepository implements IAdminUserRepository {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  async create(admin: AdminUserM): Promise<AdminUserM> {
    const adminEntity = this.adminUserRepository.create({
      name: admin.name,
      last_name: admin.last_name,
      email: admin.email,
      password: admin.password,
      role: toRole(admin.role),
    });
    const savedAdmin = await this.adminUserRepository.save(adminEntity);
    const role = adminEntity.role as Roles;
    return new AdminUserM(
        savedAdmin.id, 
        savedAdmin.name,
        savedAdmin.last_name,
        savedAdmin.email, 
        savedAdmin.password, 
        role,
        savedAdmin.updated_at,
        savedAdmin.created_at,
    );
  }

  // async createAdmin(createAdminDto: CreateAdminDto): Promise<AdminUserM> {
  //   const adminUser = this.adminUserRepository.create(createAdminDto);
  //   return this.adminUserRepository.save(adminUser);
  // }

  // async findAdminByEmail(email: string): Promise<AdminUserM | undefined> {
  //   return this.adminUserRepository.findOne({ where: { email } });
  // }


  async findByEmail(email: string): Promise<AdminUserM | null> {
    const adminEntity = await this.adminUserRepository.findOne({where: { email}});
    if(!adminEntity) return null;
    const role = adminEntity.role as Roles;
    return new AdminUserM(
        adminEntity.id,
        adminEntity.name,
        adminEntity.last_name,
        adminEntity.email,
        adminEntity.password,
        role,
        adminEntity.created_at,
        adminEntity.updated_at,
    )
  }
  

  async validateAdminCredentials(
    loginAdminDto: LoginAdminDto,
  ): Promise<AdminUserM | null> {
    const adminUser = await this.findByEmail(loginAdminDto.email);
    if (adminUser && await bcrypt.compare(loginAdminDto.password, adminUser.password)) {
      return adminUser;
    }
    return null;
  }

  async findOneById(id: number): Promise<AdminUserM | null> {
    const adminEntity = await this.adminUserRepository.findOne({ where: { id } });
    if (!adminEntity) return null;

    const role = adminEntity.role as Roles;

    return new AdminUserM(
      adminEntity.id,
      adminEntity.name,
      adminEntity.last_name,
      adminEntity.email,
      adminEntity.password,
      role,
      adminEntity.created_at,
      adminEntity.updated_at,
    );
  }

  async update(id: number, admin: AdminUserM): Promise<AdminUserM> {
    const adminEntity = await this.adminUserRepository.findOne({ where: { id } });
    if (!adminEntity) {
      throw new Error('Administrador no encontrado');
    }

    adminEntity.name = admin.name;
    adminEntity.last_name = admin.last_name;
    adminEntity.email = admin.email;
    adminEntity.password = admin.password;
    adminEntity.role = admin.role;

    const updatedAdmin = await this.adminUserRepository.save(adminEntity);
    const role = adminEntity.role as Roles;

    return new AdminUserM(
      updatedAdmin.id,
      updatedAdmin.name,
      updatedAdmin.last_name,
      updatedAdmin.email,
      updatedAdmin.password,
      role,
      updatedAdmin.created_at,
      updatedAdmin.updated_at,
    );
  }

  async delete(id: number): Promise<void> {
    const adminEntity = await this.adminUserRepository.findOne({ where: { id } });
    if (!adminEntity) {
      throw new Error('Administrador no encontrado');
    }
    await this.adminUserRepository.remove(adminEntity);
  }
 
}

function toRole(role: string): Roles {
    if (Object.values(Roles).includes(role as Roles)) {
      return role as Roles;
    }
    throw new Error(`Role ${role} is not valid`);
  }