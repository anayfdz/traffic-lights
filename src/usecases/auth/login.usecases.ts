import { UserRepository } from 'src/domain/repositories/users/userRepository.interface';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { IJwtService, IJwtServicePayload } from '../../domain/adapters/jwt.interface';
import { JWTConfig } from '../../domain/config/jwt.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JWTConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async getCookieWithJwtToken(username: string) {
    this.logger.log('LoginUseCases execute', `The user ${username} have been logged.`);
    const payload: IJwtServicePayload = { username: username };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  }

  async getCookieWithJwtRefreshToken(username: string) {
    this.logger.log('LoginUseCases execute', `The user ${username} have been logged.`);
    const payload: IJwtServicePayload = { username: username };
    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
    return cookie;
  }

  async validateUserForLocalStragtegy(username: string, pass: string) {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(pass, user.password);
    return null;
  }

  async validateUserForJWTStragtegy(username: string) {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      return null;
    }
    return user;
  }
  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) return null;
  
    const isTokenValid = await this.jwtTokenService.verifyToken(refreshToken, this.jwtConfig.getJwtRefreshSecret());
    if (!isTokenValid) return null;
  
    return user;
  }
  
}
