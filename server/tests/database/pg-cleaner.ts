import { Client } from 'pg';

export class PgCleaner {
  public readonly defaultSchema: string = 'public';
  public readonly defaultTestDatabaseName: string = 'exTest';
  public readonly testsSuiteConnection = 'test'; // I want this hardcoded

  private readonly client: Client;

  constructor() {
    // const connectionOptions = configService.getConnectionOptions(
    //   this.testsSuiteConnection,
    // ) as PostgresConnectionOptions;

    this.client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'exTest',
    });
  }

  async init(): Promise<void> {
    await this.client.connect();
  }

  async dispose(): Promise<void> {
    await this.client.end();
  }

  async run(): Promise<string[]> {
    const ormSystemTables = ['migrations']; // TypeORM system tables
    console.log('TCL: PgCleaner -> ormSystemTables', ormSystemTables);
    const allTables = await this.allTables();
    // const tablesToTruncate = allTables.without(ormSystemTables);
    const tablesToTruncate = allTables.filter(x => !ormSystemTables.includes(x));
    const queries = tablesToTruncate.map(table => `DELETE FROM ${this.defaultSchema}."${table}";`);
    await this.client.query(queries.join('\n'));

    return tablesToTruncate;
  }

  async allTables(): Promise<string[]> {
    const allTablesQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = '${this.defaultSchema}'
      -- AND table_type = 'BASE TABLE';
    `;
    const result = await this.client.query(allTablesQuery);
    const tableNames = result.rows.map(row => row.table_name);
    return tableNames;
  }
}
