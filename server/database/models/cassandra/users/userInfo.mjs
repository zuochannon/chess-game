import { cassandraClient } from "../../../connection.mjs"
import constants from "../../../constants.mjs";

const createUserInfo = async () => {

    const query = `CREATE TABLE IF NOT EXISTS ${constants.KEYSPACE}.Users (
        userID UUID,
        username text,
        email text,
        avatarURL text,
        PRIMARY KEY(userID)
    );`
    await cassandraClient.execute(query);
    console.log("created user table");
};

export const getAvatarURL = async (userID) => {
const query = `SELECT avatarurl FROM ${constants.KEYSPACE}.Users WHERE userid = ?;`;
  return (
    await cassandraClient.execute(query, [userID], {
      prepare: true,
    })
  ).rows[0].avatarurl;
}

export default createUserInfo;