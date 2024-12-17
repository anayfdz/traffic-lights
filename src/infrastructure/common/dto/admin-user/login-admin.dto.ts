import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginAdminDto {
  @ApiProperty({
    description: 'Correo electrónico del administrador',
    example: 'example@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: 'Contraseña del administrador',
    example: 'example',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
  }
  