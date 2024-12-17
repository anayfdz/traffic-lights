//import { UserRepository } from 'src/domain/repositories/users/userRepository.interface';
import { UserRepository } from '../../domain/repositories/users/userRepository.interface';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { IJwtService, IJwtServicePayload } from '../../domain/adapters/jwt.interface';
import { JWTConfig } from '../../domain/config/jwt.interface';
import { ILogger } from '../../domain/logger/logger.interface';




interface loginResponse {
  access_token?: string;
  user: {
    username: string;
    email: string;
    sub: number;
  };
  token: string;
}
export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JWTConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) { }

  async loginUser(email: string, password: string): Promise<loginResponse> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const isPasswordValid = await this.bcryptService.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }
    const payload: IJwtServicePayload = { username: user.nickname, email: user.email, sub: user.id };
    const access_token = this.jwtTokenService.createToken(payload, process.env.JWT_SECRET, process.env.JWT_EXPIRATION_TIME);
    console.log('Access Token generado:', access_token);
    return  {
      user: {
        username: user.nickname,
        email: user.email,
        sub: user.id,
      },
      token: access_token,
    };
  }

  async getCookieWithJwtToken(email: string) {
    this.logger.log('LoginUseCases execute', `The user ${email} have been logged.`);
    // Buscar el usuario por su email
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const payload: IJwtServicePayload = { email: user.email, sub: user.id };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  }

  async getCookieWithJwtRefreshToken(email: string) {
    this.logger.log('LoginUseCases execute', `The user ${email} have been logged.`);
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const payload: IJwtServicePayload = { email: user.email, sub: user.id };
    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
    return cookie;
  }

  async validateUserForLocalStragtegy(email: string, pass: string) {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      return null;
    }
    if (!user.password) {
      throw new Error('Contraseña no encontrada para el usuario');
    }
    const match = await this.bcryptService.compare(pass, user.password);
    if (!match) {
      return null;  // Si la contraseña no coincide, devolvemos null
    }
    return user;
  }

  async validateUserForJWTStragtegy(email: string, id?: number) {
    let user;
    if(id) {
      user = await this.userRepository.getUserById(id);
    } else if(email) {
      user = await this.userRepository.findOneByEmail(email);
    }
    
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
