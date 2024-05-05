import { cassandraClient } from "../../../connection.mjs"
import constants from "../../../constants.mjs";

const createUserInfo = async () => {

    const query = `CREATE TABLE IF NOT EXISTS ${constants.KEYSPACE}.Users (
        userID UUID,
        username text,
        email text,
        PRIMARY KEY(userID)
    );`
    await cassandraClient.execute(query);
    console.log("created user table");
};

export default createUserInfo;