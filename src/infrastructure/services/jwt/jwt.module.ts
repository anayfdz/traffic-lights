import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';

@Module({
  imports: [NestJwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || '60m', },
    }
  )
  }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService, NestJwtModule],
})
export class JwtConfigModule { }
