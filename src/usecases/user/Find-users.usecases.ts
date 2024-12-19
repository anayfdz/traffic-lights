import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/users/userRepository.interface';
import { User } from 'src/infrastructure/entities/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/users/user.repository';


export interface UserResponse {
  name: string;
  lastName: string;
  nickname: string;
  status: string;
}

@Injectable()
export class FindUserUseCase {
  constructor(
    private readonly userRepository: DatabaseUserRepository,
  ) {}

  async execute(): Promise<UserResponse[]> {
    const users = await this.userRepository.findAllUsers();
    if (!users || users.length === 0) {
      throw new Error('No se encontró registro de usuario');
    }
    return users.map(user => ({ 
      name: user.name,
      lastName: user.lastName,
      nickname: user.nickname,
      status: user.status,
    }));
  }
}
