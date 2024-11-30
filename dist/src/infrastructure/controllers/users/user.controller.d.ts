import { DatabaseUserRepository } from '../../repositories/users/user.repository';
import { CreateUserDto } from '../../common/dto/user/create-user.dto';
import { ValidateEmailDto } from '../../common/dto/user/validate-email.dto';
import { UserM } from '../../../domain/model/users/user';
import { RegisterUserUseCase } from 'src/usecases/user/register-user.usecases';
import { ValidateEmailUsecases } from 'src/usecases/user/validate-email.usecases';
export declare class UserController {
    private readonly userService;
    private readonly registerUserUseCase;
    private readonly validateEmailUseCase;
    constructor(userService: DatabaseUserRepository, registerUserUseCase: RegisterUserUseCase, validateEmailUseCase: ValidateEmailUsecases);
    registerUser(createUserDto: CreateUserDto): Promise<UserM>;
    validateEmail(validateEmailDto: ValidateEmailDto): Promise<boolean>;
}
