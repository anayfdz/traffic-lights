"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfigModule = exports.getTypeOrmModuleOptions = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const environment_config_module_1 = require("../environment-config/environment-config.module");
const environment_config_service_1 = require("../environment-config/environment-config.service");
const getTypeOrmModuleOptions = (config) => ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    synchronize: false,
    schema: process.env.DATABASE_SCHEMA,
    migrationsRun: true,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
});
exports.getTypeOrmModuleOptions = getTypeOrmModuleOptions;
let TypeOrmConfigModule = class TypeOrmConfigModule {
};
TypeOrmConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [environment_config_module_1.EnvironmentConfigModule],
                inject: [environment_config_service_1.EnvironmentConfigService],
                useFactory: exports.getTypeOrmModuleOptions,
            }),
        ],
    })
], TypeOrmConfigModule);
exports.TypeOrmConfigModule = TypeOrmConfigModule;
//# sourceMappingURL=typeorm.module.js.map