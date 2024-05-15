import { cassandraClient } from "../../../connection.mjs";
import constants from "../../../constants.mjs";

const createGameAnnotations = async () => {
  const query = `CREATE TABLE IF NOT EXISTS ${constants.KEYSPACE}.GameAnnotations (
        gameID UUID,
        userID UUID,
        annotations map< frozen<tuple<int, text>>, text>,
        PRIMARY KEY (gameID, userID)
    );`;
  await cassandraClient.execute(query);
  console.log("created game annotation table");
};

// export const insertReplay = async (states, winningTeam) => {
//     const query = `INSERT INTO ${constants.KEYSPACE}.GameReplay (gameID, states, winningTeam) VALUES (uuid(), ?, ?);`
//     await cassandraClient.execute(query, [states, winningTeam], {
//         prepare: true,
//     });
// }

export const getAnnotations = async (gameID, userID) => {
    const query = `SELECT annotations FROM ${constants.KEYSPACE}.GameAnnotations WHERE gameid = ? AND userid = ?;`;
    return (
      await cassandraClient.execute(query, [gameID, userID], {
        prepare: true,
      })
    ).rows[0].annotations;
}

export default createGameAnnotations;
