import { ConnectionOptions } from "typeorm"
import { createConnection, Connection } from 'typeorm';
// fake NODE_ENV to get the "right" options
process.env.NODE_ENV = 'development';
// import would be nice, but you can't have everything
const options = require("../ormconfig.js");
const ormOptions: ConnectionOptions = process.env.NODE_ENV !== 'test' ? options[0] : options[1];

export const dbConnection: Promise<Connection> = createConnection(ormOptions);
