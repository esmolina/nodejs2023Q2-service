import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const env = config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.parsed.POSTGRES_HOST as string,
  port: (Number(env.parsed.POSTGRES_PORT) || 5432) as number,
  username: env.parsed.POSTGRES_USER as string,
  password: env.parsed.POSTGRES_PASSWORD as string,
  database: env.parsed.POSTGRES_DATABASE as string,
  entities: ['dist/**/*.entity{.ts,.js}'],
  // entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  logging: true,
  migrationsTableName: 'migration',
  migrations: ['dist/**/migration/*{.ts,.js}'],
  // migrations: [
  //   __dirname + '/migration/**/*.ts',
  //   __dirname + '/migration/**/*.js',
  // ],
  synchronize: true,
  migrationsRun: true,
};
