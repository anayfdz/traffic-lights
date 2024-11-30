import { JwtService } from '@nestjs/jwt';
import { IJwtService, IJwtServicePayload } from '../../../domain/adapters/jwt.interface';
export declare class JwtTokenService implements IJwtService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    checkToken(token: string): Promise<any>;
    createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): string;
    verifyToken(token: string, secret: string): Promise<any>;
}
