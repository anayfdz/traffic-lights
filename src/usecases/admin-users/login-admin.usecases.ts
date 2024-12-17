import { Injectable } from '@nestjs/common';
import { IJwtServicePayload } from '../../domain/adapters/jwt.interface';
//import { DatabaseAdminUserRepository } from 'src/infrastructure/repositories/admin-users/admin.repository';
import { DatabaseAdminUserRepository } from '../../infrastructure/repositories/admin-users/admin.repository';
//import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';
import { JwtTokenService } from '../../infrastructure/services/jwt/jwt.service';
//import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { BcryptService } from '../../infrastructure/services/bcrypt/bcrypt.service';
//import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { LoggerService } from '../../infrastructure/logger/logger.service';

import { Response } from 'express';

export interface loginAdminResponse {
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
    console.log('aqui la consulta a los roles', admin)
    if (!admin) {
      throw new Error('Administrador no encontrado');
    }

    if (admin.email !== email) {
      throw new Error('Email no coincide con el administrador');
    }

    const isPasswordValid = await this.bcryptService.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    const payload: IJwtServicePayload = { 
      email: admin.email, 
      sub: admin.id, 
      role: admin.role 
    };
    console.log('aqui el payload admin', payload)
    const access_token = this.jwtService.createToken(payload, process.env.JWT_SECRET, process.env.JWT_EXPIRATION_TIME);
    // res.cookie('Authentication', access_token, { httpOnly: true, secure: true }); // secure: true solo si estás usando HTTPS
    // res.send({ message: 'Login exitoso' });

    console.log('aqui la creacion y devolucion del token', access_token)
    
    this.logger.log('LoginAdminUseCases', `Administrador ${email} ha iniciado sesión correctamente.`);
    
    return {
      token: access_token,
    };
  }
  async validateUserForJWTStragtegy(email: string, id?: number) {
    let user;
    if(id) {
      user = await this.adminUserRepository.findOneById(id);
    } else if(email) {
      user = await this.adminUserRepository.findByEmail(email);
    }
    
    if (!user) {
      return null;
    }
    return user;
  }
}