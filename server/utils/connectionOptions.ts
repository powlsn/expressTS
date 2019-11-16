import { ConnectionOptions } from "typeorm"

export const devOptions: ConnectionOptions = {
    name: 'development',
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'Awesome1',
    database: 'ets_dev',
    dropSchema: false,
    entities: ['./entity/*{.ts,.js}'],
    migrations: ['./mirgations/*.js'],
};
