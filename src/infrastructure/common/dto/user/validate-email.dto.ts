import { ApiProperty } from "@nestjs/swagger";

export class ValidateEmailDto { 
    @ApiProperty({
        description: 'Correo electrónico del usuario a validar',
        example: 'example@example.com',
      })
    email: string; 
    @ApiProperty({
        description: 'Código OTP enviado al correo electrónico',
        example: '11111',
      })
    otp_code: string;
}