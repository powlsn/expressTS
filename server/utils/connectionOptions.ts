import { ConnectionOptions } from "typeorm"
import { createConnection, Connection } from 'typeorm';
// fake NODE_ENV to get the "right" options
// process.env.NODE_ENV = 'test';
// import would be nice, but you can't have everything
const options = require("../ormconfig.js");
const env = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV;
const ormOptions: ConnectionOptions = env !== 'test' ? options[0] : options[1];
console.log("TCL: NODE_ENV", process.env.NODE_ENV)
console.log("TCL: env", env)

export const dbConnection: Promise<Connection> = createConnection(ormOptions);
