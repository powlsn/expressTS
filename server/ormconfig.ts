/* eslint-disable @typescript-eslint/no-var-requires */
// const dotenv = require('dotenv');
// const findUp = require('find-up');

// const result = dotenv.config({
//   path: findUp.sync(`env/${process.env.NODE_ENV}.env`),
// });

// if (result.error) throw result.error;

const common = {
  type: 'postgres',
  host: '127.0.0.1',
  port: '5432',
  username: 'postgres',
  password: 'Awesome1',
  database: 'ets_dev',
  dropSchema: false,
  entities: ['./entity/*{.ts,.js}'],
  cli: {
    entitiesDir: './src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

module.exports = [
  Object.assign(common, {
    name: 'development',
    synchronize: true,
    logging: true,
  }),
  Object.assign(
    {
      name: 'test',
      synchronize: true,
      logging: false,
    },
    common,
  ),
];
