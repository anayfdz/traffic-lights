import { Injectable } from '@nestjs/common';
import { AdminUserService } from 'src/infrastructure/services/admin-users/admin-user.service';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';

@Injectable()
export class AdminRegistrationService {
  constructor(
    private adminUserService: AdminUserService, // Para registrar al admin en la tabla 'admin_users'
    private bcryptService: BcryptService, // Para cifrar la contraseña
  ) {}

  async registerAdmin(email: string, password: string, name: string, last_name: string) {
    // Cifrar la contraseña
    const hashedPassword = await this.bcryptService.hash(password);

    // Crear el administrador directamente en la tabla 'admin_users'
    const adminUser = await this.adminUserService.createAdmin({
      email,
      password: hashedPassword,
      name,
      last_name,
      role: 'admin', // Asignar el rol 'admin'
    });

    return {
      message: 'Administrador registrado correctamente',
      adminUser,
    };
  }
}
