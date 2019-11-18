import { ConnectionOptions } from "typeorm"
import { createConnection, Connection } from 'typeorm';
// fake NODE_ENV to get the "right" options
process.env.NODE_ENV = 'test';
// import would be nice, but you can't have everything
const options = require("../ormconfig.js");


const ormOptions: ConnectionOptions = process.env.NODE_ENV !== 'test' ? options[0] : options[1];

export const dbConnection: Promise<Connection> = createConnection(ormOptions);
// old gandalf style x_X
// export const devOptions: ConnectionOptions = {
//     name: 'development',
//     type: 'postgres',
//     host: '127.0.0.1',
//     port: 5432,
//     username: 'postgres',
//     password: 'Awesome1',
//     database: 'ets_dev',
//     dropSchema: false,
//     entities: ['./entity/*{.ts,.js}'],
//     migrations: ['./mirgations/*.js'],
// };
