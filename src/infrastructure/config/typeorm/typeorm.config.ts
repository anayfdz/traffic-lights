import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path'; 

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: './env/local.env' });
}

const config = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    path.join(__dirname, './../../**/*.entity{.ts,.js}')
  ],
  synchronize: false,
  schema: process.env.DATABASE_SCHEMA,
  migrationsRun: true,
  migrationsTableName: 'migration_todo',
  migrations: [
    path.join(__dirname, './../../dist/database/migrations/**/*{.ts,.js}')
  ],
});

console.log(config);

export default config;
