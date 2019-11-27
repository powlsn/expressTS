import { PgCleaner } from './pg-cleaner';

let dbCleaner: PgCleaner;

beforeAll(async () => {
  dbCleaner = new PgCleaner();

  await dbCleaner.init();
});

beforeEach(async () => {
  await dbCleaner.run();
});

afterAll(async () => {
  await dbCleaner.run();
  await dbCleaner.dispose();
});
