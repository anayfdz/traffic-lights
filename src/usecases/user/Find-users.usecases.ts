import { Injectable } from '@nestjs/common';
import { User } from '../../infrastructure/entities/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../domain/repositories/users/userRepository.interface';


@Injectable()
export class FindUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<any> {
    const user = await this.userRepository.findAllUsers();
    if (!user) {
      throw new Error('No se encontró registro de usuario');
    }
    return user;
  }
}
