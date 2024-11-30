import { UserRepository } from 'src/domain/repositories/users/userRepository.interface';
import { UserM } from '../../domain/model/users/user';
import { CreateUserDto } from 'src/infrastructure/common/dto/user/create-user.dto';
export declare class RegisterUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(createUserDto: CreateUserDto): Promise<UserM>;
}
