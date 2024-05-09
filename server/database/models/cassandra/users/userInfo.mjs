import { cassandraClient } from "../../../connection.mjs";
import constants from "../../../constants.mjs";

const createUserInfo = async () => {
  const query = `CREATE TABLE IF NOT EXISTS ${constants.KEYSPACE}.Users (
        userID UUID,
        username text,
        email text,
        avatarURL text,
        elo int,
        PRIMARY KEY(userID)
    );`;
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
};

// may increase or decrease (positive or negative)
export const updateElo = async (userID, eloDelta) => {
  const currentElo = (
    await cassandraClient.execute(`SELECT elo FROM ${constants.KEYSPACE}.Users WHERE userid = ?`,
      [userID],
      { prepare: true }
    )
  ).rows[0].elo;

  const newElo = currentElo + eloDelta;

  await cassandraClient.execute(
    `UPDATE ${constants.KEYSPACE}.Users SET elo = ? WHERE userid=?`,
    [newElo, userID],
    { prepare: true }
  );
};

export const getAllElo = async () => {
  return (await cassandraClient.execute(`SELECT username, elo FROM ${constants.KEYSPACE}.Users`)).rows;
}

export default createUserInfo;
