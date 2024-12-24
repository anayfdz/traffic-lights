//import { CreateUserDto } from "src/infrastructure/common/dto/user/create-user.dto";
import { CreateUserDto } from "../../../infrastructure/common/dto/user/create-user.dto";
import { UserM } from "../../model/users/user";
//import { User } from "src/infrastructure/entities/users/user.entity";
import { User } from "../../../infrastructure/entities/users/user.entity";
//import { ValidateEmailDto } from "src/infrastructure/common/dto/user/validate-email.dto";
import { ValidateEmailDto } from "../../../infrastructure/common/dto/user/validate-email.dto";
import { UpdateUserDto } from "../../../infrastructure/common/dto/user/update-user.dto";
import { LoginDto } from "src/infrastructure/common/dto/auth/login.dto";

export interface UserRepository {
  registerUser(createUserDto: CreateUserDto): Promise<UserM>;
  findOneByNickname(nickname: string): Promise<UserM | null>
  getUserById(userId: number): Promise<User>;
  resendOtp(email: string): Promise<void>;
  loginUser(loginDto: LoginDto): Promise<{access_token: string}>
  validateEmailWithOtp(validateEmailDto: ValidateEmailDto): Promise<boolean>
  getUserByUsername(username: string): Promise<UserM>;
  findAllUsers(): Promise<UserM[]>;
  //findOneUser(id: number): Promise<UserM>;
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserM>;
  deleteUser(id: number): Promise<void>;
  getUserByEmail(email: string): Promise<boolean>;
  findOneByEmail(email: string): Promise<UserM | undefined>
  comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean>
}
