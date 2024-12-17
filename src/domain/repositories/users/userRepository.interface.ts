//import { CreateUserDto } from "src/infrastructure/common/dto/user/create-user.dto";
import { CreateUserDto } from "../../../infrastructure/common/dto/user/create-user.dto";
import { UserM } from "../../model/users/user";
//import { User } from "src/infrastructure/entities/users/user.entity";
import { User } from "../../../infrastructure/entities/users/user.entity";
//import { ValidateEmailDto } from "src/infrastructure/common/dto/user/validate-email.dto";
import { ValidateEmailDto } from "../../../infrastructure/common/dto/user/validate-email.dto";
import { UpdateUserDto } from "../../../infrastructure/common/dto/user/update-user.dto";

export interface UserRepository {
  registerUser(createUserDto: CreateUserDto): Promise<UserM>;
  getUserById(userId: number): Promise<User>;
  resendOtp(email: string): Promise<void>;
  validateEmailWithOtp(validateEmailDto: ValidateEmailDto): Promise<boolean>
  getUserByUsername(username: string): Promise<UserM>;
  findAllUsers(): Promise<UserM[]>;
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserM>;
  deleteUser(id: number): Promise<void>;
  getUserByEmail(email: string): Promise<boolean>;
  findOneByEmail(email: string): Promise<User | undefined>
  comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean>
}
