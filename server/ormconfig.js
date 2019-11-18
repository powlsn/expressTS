const common = {
  type: 'postgres',
  host: '127.0.0.1',
  port: '5432',
  dropSchema: false,
  entities: ['./**/*.entity.ts'],
  migrations: ['build/migrations/*.js'],
  cli: {
    entitiesDir: ['./**/*.entity.js', './**/*.entity.ts'],
    migrationsDir: 'build/migrations/*.js',
    subscribersDir: 'subscriber',
  },
};

module.exports = [
  Object.assign({}, common, {
    name: 'development',
    username: 'postgres',
    password: 'Awesome1',
    synchronize: false,
    logging: true,
    database: 'exDev',
  }),
  Object.assign({}, common, {
    name: 'test',
    username: 'postgres',
    password: 'Awesome1',
    synchronize: false,
    logging: false,
    database: 'exTest',
  }),
];
