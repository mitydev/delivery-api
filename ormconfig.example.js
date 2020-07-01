module.exports = {
  type: 'postgres',
  host: '',
  port: 5432,
  username: '',
  password: '',
  database: '',
  synchronize: true,
  logging: false,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber'
  }
};
