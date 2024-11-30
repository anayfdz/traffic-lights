import { UserRepository } from "src/domain/repositories/users/userRepository.interface";
import { ValidateEmailDto } from "src/infrastructure/common/dto/user/validate-email.dto";
export declare class ValidateEmailUsecases {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(validateEmailDto: ValidateEmailDto): Promise<boolean>;
}
