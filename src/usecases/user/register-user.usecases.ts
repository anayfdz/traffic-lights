import { UserRepository } from 'src/domain/repositories/users/userRepository.interface';
import { UserM } from '../../domain/model/users/user';
import { CreateUserDto } from 'src/infrastructure/common/dto/user/create-user.dto';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<UserM> {
    const newUser = await this.userRepository.registerUser(createUserDto);
    return newUser;
  }
}
