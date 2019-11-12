import { Client } from 'pg';
// import '../../shared/src/extensions/array';

export class PgCleaner {
  public readonly defaultSchema: string = 'public';
  public readonly defaultTestDatabaseName: string = 'pvs-test';
  public readonly ormSystemTables = ['knex_migrations', 'knex_migrations_lock'];

  private client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Awesome1',
    database: this.defaultTestDatabaseName, // todo: configurable test db name
  });

  async init(): Promise<void> {
    await this.client.connect();
  }

  async dispose(): Promise<void> {
    await this.client.end();
  }

  async truncateTables(): Promise<string[]> {
    const allTables = await this.allTables();

    // const tablesToTruncate = allTables; //.without(ormSystemTables);
    const tablesToTruncate = allTables.filter(
      x => !this.ormSystemTables.includes(x),
    );

    const queries = tablesToTruncate.map(
      table => `DELETE FROM ${this.defaultSchema}."${table}";`,
    );
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
