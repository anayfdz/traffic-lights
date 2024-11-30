import { UserRepository } from 'src/domain/repositories/users/userRepository.interface';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { IJwtService } from '../../domain/adapters/jwt.interface';
import { JWTConfig } from '../../domain/config/jwt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
export declare class LoginUseCases {
    private readonly logger;
    private readonly jwtTokenService;
    private readonly jwtConfig;
    private readonly userRepository;
    private readonly bcryptService;
    constructor(logger: ILogger, jwtTokenService: IJwtService, jwtConfig: JWTConfig, userRepository: UserRepository, bcryptService: IBcryptService);
    getCookieWithJwtToken(username: string): Promise<string>;
    getCookieWithJwtRefreshToken(username: string): Promise<string>;
    validateUserForLocalStragtegy(username: string, pass: string): Promise<any>;
    validateUserForJWTStragtegy(username: string): Promise<import("../../domain/model/users/user").UserM>;
    getUserIfRefreshTokenMatches(refreshToken: string, username: string): Promise<import("../../domain/model/users/user").UserM>;
}
