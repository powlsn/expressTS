const common = {
  type: 'postgres',
  host: '127.0.0.1',
  port: '5432',
  dropSchema: false,
  entities: ['./**/*.entity.ts'],
  migrations: ['build/migrations/*.js'],
  cli: {
    entitiesDir: ['./**/*.entity.js', './**/*.entity.ts'],
    migrationsDir: 'migrations',
    subscribersDir: 'subscriber',
  },
};

module.exports = [
  Object.assign({}, common, {
    name: 'development',
    username: 'postgres',
    password: 'postgres',
    synchronize: false,
    logging: true,
    database: 'exDev',
  }),
  Object.assign({}, common, {
    name: 'test',
    username: 'postgres',
    password: 'postgres',
    synchronize: false,
    logging: false,
    database: 'exTest',
  }),
];
