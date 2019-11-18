const common = {
  type: 'postgres',
  host: '127.0.0.1',
  port: '5432',
  dropSchema: false,
  entities: ['./**/*.entity.js', './**/*.entity.ts'],
  migrations: ['migrations/**/*.ts'],
  cli: {
    entitiesDir: ['./**/*.entity.js', './**/*.entity.ts'],
    migrationsDir: 'migrations/**/*.ts',
    subscribersDir: 'subscriber',
  },
};

module.exports = [
  Object.assign({}, common, {
    name: 'development',
    username: 'postgres',
    password: 'Awesome1',
    // synchronize: true,
    logging: true,
    database: 'ets_dev',
  }),
  Object.assign({}, common, {
    name: 'test',
    username: 'postgres',
    password: 'Awesome1',
    // synchronize: true,
    logging: false,
    database: 'ets_test',
  }),
];
