import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    name: string;
    @ApiProperty({
        description: 'El email del usuario',
        example: 'example@example.com',
      })
    email: string; 
    @ApiProperty({
        description: 'La contraseña del usuario',
        example: 'example',
      })
    password: string; 
    @ApiProperty({
        description: 'El nickname del usuario',
        example: 'example',
      })
    nickname: string;
    last_name: string;
    @ApiProperty({
        description: 'El DNI del usuario',
        example: '99999999',
      })
    dni: string
}