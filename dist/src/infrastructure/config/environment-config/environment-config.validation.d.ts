declare enum Environment {
    Development = "development",
    Production = "production",
    Local = "local",
    Test = "test"
}
declare class EnvironmentVariables {
    NODE_ENV: Environment;
    JWT_SECRET: string;
    JWT_EXPIRATION_TIME: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    DATABASE_SCHEMA: string;
    DATABASE_SYNCHRONIZE: boolean;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
