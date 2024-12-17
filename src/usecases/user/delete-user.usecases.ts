import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../infrastructure/entities/users/user.entity';
import { UserRepository } from '../../domain/repositories/users/userRepository.interface';


@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
