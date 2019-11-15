import { getConnectionOptions } from "typeorm"

export const connectionOptions = async () => {
    return await getConnectionOptions('development');
}