import { UserRepository } from 'src/domain/repositories/users/userRepository.interface';
import { UserM } from '../../domain/model/users/user';
import { CreateUserDto } from 'src/infrastructure/common/dto/user/create-user.dto';
import { ExternalService } from '../../infrastructure/repositories/users/external-service/external.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository, 
    private readonly externalService: ExternalService) {}

  async execute(createUserDto: CreateUserDto): Promise<UserM> {
    const dniInfo = await this.externalService.getDniInfo(createUserDto.dni);
    if(!dniInfo || !dniInfo.nombres || !dniInfo.apellidoPaterno || !dniInfo.apellidoMaterno) {
      throw new Error('No se pudo obtener la información del DNI');
    }
    const name = dniInfo.nombres.trim();
    const lastName = (dniInfo.apellidoPaterno || '') + ' ' + (dniInfo.apellidoMaterno || '');
    const newUser = await this.userRepository.registerUser({ 
      ...createUserDto, 
      name,
      last_name: lastName
    });
    return newUser;
  }
}
