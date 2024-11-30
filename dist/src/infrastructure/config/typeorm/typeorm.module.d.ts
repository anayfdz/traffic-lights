import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
export declare const getTypeOrmModuleOptions: (config: EnvironmentConfigService) => TypeOrmModuleOptions;
export declare class TypeOrmConfigModule {
}
