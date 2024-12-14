import { Injectable } from '@nestjs/common';
import { IJwtServicePayload } from '../../domain/adapters/jwt.interface';
import { DatabaseAdminUserRepository } from 'src/infrastructure/repositories/admin-users/admin.repository';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

interface loginAdminResponse {
  access_token?: string;
  token: string;
}

@Injectable()
export class LoginAdminUseCases {
  constructor(
    private readonly adminUserRepository: DatabaseAdminUserRepository,
    private readonly jwtService: JwtTokenService,
    private readonly bcryptService: BcryptService,
    private readonly logger: LoggerService,
  ) { }

  async loginAdmin(email: string, password: string): Promise<loginAdminResponse> {
    const admin = await this.adminUserRepository.findByEmail(email);
    if (!admin) {
      throw new Error('Administrador no encontrado');
    }

    const isPasswordValid = await this.bcryptService.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    const payload: IJwtServicePayload = { email: admin.email, sub: admin.id, role: admin.role };
    const access_token = this.jwtService.createToken(payload, process.env.JWT_SECRET, process.env.JWT_EXPIRATION_TIME);
    
    this.logger.log('LoginAdminUseCases', `Administrador ${email} ha iniciado sesión correctamente.`);
    
    return {
      token: access_token,
    };
  }
}