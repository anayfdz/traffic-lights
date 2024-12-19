import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../infrastructure/entities/users/user.entity';
import { UserRepository } from '../../domain/repositories/users/userRepository.interface';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/users/user.repository';
export interface ResponseD {
  message: string;
}
@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: DatabaseUserRepository,
  ) {}

  
  async execute(id: number): Promise<ResponseD> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.userRepository.deleteUser(id);
    return { message: 'Usuario eliminado con éxito' };
  }
}
