export type AppConfig = {
  readonly environment: string;
  readonly port: string;
  readonly mongoDb: MongoDbConfig;
  readonly redisUrl: string;
  readonly postgresDb: PostgresConfig;
}

type MongoDbConfig = {
  username: string;
  password: string;
  host: string;
  port: string;
}

type PostgresConfig = {
  username: string;
  password: string;
  host: string;
  port: string;
  database: string;
}

const throwIfUndefined = (value: string | undefined, propName: string): string => {
  if (!value) {
    throw new Error(`process.env[${propName}] was not defined`);
  }
  return value;
};

export const config: AppConfig = {
  get environment(): string {
    return throwIfUndefined(process.env.NODE_ENV, 'NODE_ENV');
  },
  get port(): string {
    return throwIfUndefined(process.env.PORT, 'PORT');
  },
  get redisUrl(): string {
    return throwIfUndefined(process.env.REDIS_URL, 'REDIS_URL');
  },
  get mongoDb(): MongoDbConfig {
    return {
      username: throwIfUndefined(process.env.MONGO_USERNAME, 'MONGO_USERNAME'),
      password: throwIfUndefined(process.env.MONGO_PASSWORD, 'MONGO_PASSWORD'),
      host: throwIfUndefined(process.env.MONGO_HOST, 'MONGO_HOST'),
      port: throwIfUndefined(process.env.MONGO_PORT, 'MONGO_PORT'),
    };
  },
  get postgresDb(): PostgresConfig {
    return {
      username: throwIfUndefined(process.env.POSTGRES_USERNAME, 'POSTGRES_USERNAME'),
      password: throwIfUndefined(process.env.POSTGRES_PASSWORD, 'POSTGRES_PASSWORD'),
      host: throwIfUndefined(process.env.POSTGRES_HOST, 'POSTGRES_HOST'),
      port: throwIfUndefined(process.env.POSTGRES_PORT, 'POSTGRES_PORT'),
      database: throwIfUndefined(process.env.POSTGRES_DB, 'POSTGRES_DB'),
    };
  }
};
