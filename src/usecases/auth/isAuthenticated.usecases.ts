import { UserM, UserWithoutPassword } from '../../domain/model/users/user';
import { UserRepository } from '../../domain/repositories/users/userRepository.interface';

export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: UserRepository) {}

  async execute(username: string): Promise<UserWithoutPassword> {
    const user: UserM = await this.adminUserRepo.getUserByUsername(username);
    const { password, ...info } = user;
    return info as UserWithoutPassword;
  }
}
