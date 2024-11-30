"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const userRepository_interface_1 = require("../../domain/repositories/users/userRepository.interface");
const create_user_dto_1 = require("../../infrastructure/common/dto/user/create-user.dto");
class RegisterUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(createUserDto) {
        const newUser = await this.userRepository.registerUser(createUserDto);
        return newUser;
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
//# sourceMappingURL=register-user.usecases.js.map