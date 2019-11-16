import { createConnection, Connection } from 'typeorm';
import { devOptions } from './connectionOptions';
console.log("TCL: devOptions", devOptions)
// const ormOptions = process.env.TEST ? testOptions : devOptions;
export const dbConnection: Promise<Connection> = createConnection(devOptions); // (ormOptions)
console.log("TCL: dbConnection", dbConnection)