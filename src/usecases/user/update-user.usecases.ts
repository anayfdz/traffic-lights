// import { Injectable } from '@nestjs/common';
// import { User } from '../../infrastructure/entities/users/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserRepository } from '../../domain/repositories/users/userRepository.interface';
// import { UpdateUserDto } from '../../infrastructure/common/dto/user/update-user.dto';
// import { DatabaseUserRepository } from 'src/infrastructure/repositories/users/user.repository';


// @Injectable()
// export class UpdateUserUseCase {
//   constructor(
//     private readonly userRepository: DatabaseUserRepository,
//   ) {}

//   async execute(id: number, updateUserDto: UpdateUserDto): Promise<any> {
//     const user = await this.userRepository.getUserById(id);
//     if (!user) {
//       throw new Error('No se encontró registro de usuario');
//     }
//     await this.userRepository.updateUser(id, updateUserDto);
//     return user;
//   }
// }
