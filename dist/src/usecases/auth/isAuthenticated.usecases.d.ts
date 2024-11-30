import { UserWithoutPassword } from '../../domain/model/users/user';
import { UserRepository } from '../../domain/repositories/users/userRepository.interface';
export declare class IsAuthenticatedUseCases {
    private readonly adminUserRepo;
    constructor(adminUserRepo: UserRepository);
    execute(username: string): Promise<UserWithoutPassword>;
}
