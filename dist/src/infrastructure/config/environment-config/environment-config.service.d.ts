import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { JWTConfig } from '../../../domain/config/jwt.interface';
export declare class EnvironmentConfigService implements DatabaseConfig, JWTConfig {
    private configService;
    constructor(configService: ConfigService);
    getJwtSecret(): string;
    getJwtExpirationTime(): string;
    getJwtRefreshSecret(): string;
    getJwtRefreshExpirationTime(): string;
    getDatabaseHost(): string;
    getDatabasePort(): number;
    getDatabaseUser(): string;
    getDatabasePassword(): string;
    getDatabaseName(): string;
    getDatabaseSchema(): string;
    getDatabaseSync(): boolean;
}
