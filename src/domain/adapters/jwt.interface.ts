export interface IJwtServicePayload {
  username?: string;
  email: string;
  sub: number;
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): string;
  verifyToken(token: string, secret: string): Promise<any>; 
}
