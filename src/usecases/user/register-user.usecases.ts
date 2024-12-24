//import { UserRepository } from 'src/domain/repositories/users/userRepository.interface';
import { UserRepository } from '../../domain/repositories/users/userRepository.interface';

import { UserM } from '../../domain/model/users/user';
//import { CreateUserDto } from 'src/infrastructure/common/dto/user/create-user.dto';
import { CreateUserDto } from '../../infrastructure/common/dto/user/create-user.dto';
import { ExternalService } from '../../infrastructure/repositories/users/external-service/external.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto'; 
import { DatabaseUserRepository } from 'src/infrastructure/repositories/users/user.repository';
@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: DatabaseUserRepository, 
    private readonly externalService: ExternalService) {}

  async execute(createUserDto: any): Promise<UserM> {
    const dniInfo = await this.externalService.getDniInfo(createUserDto.dni);
    if(!dniInfo || !dniInfo.nombres || !dniInfo.apellidoPaterno || !dniInfo.apellidoMaterno) {
      throw new Error('No se pudo obtener la información del DNI');
    }
    const name = dniInfo.nombres.trim();
    const lastName = (dniInfo.apellidoPaterno || '') + ' ' + (dniInfo.apellidoMaterno || '');
    let nickname = createUserDto.nickname;
    if (!nickname) {
      nickname = await this.generateUniqueNickname();
    } else {
      const existingUser = await this.userRepository.findOneByNickname(nickname); 
      if (existingUser) {
        throw new ConflictException('El nickname ya está en uso');
      }
    }
    const newUser = await this.userRepository.registerUser({ 
      ...createUserDto, 
      name,
      last_name: lastName,
      nickname
    });
    return newUser;
  }

  private async generateUniqueNickname(): Promise<string> {
    let nickname: string;
    let isUnique = false;

    while (!isUnique) {
      nickname = `user_${randomBytes(4).toString('hex')}`;
      const existingUser = await this.userRepository.findOneByNickname(nickname); 
      if (!existingUser) {
        isUnique = true;
      }
    }

    return nickname;
  }
}
