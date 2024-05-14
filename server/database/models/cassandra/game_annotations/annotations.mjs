import { cassandraClient } from "../../../connection.mjs";
import constants from "../../../constants.mjs";

const createGameAnnotations = async () => {
  
  const query = `CREATE TABLE IF NOT EXISTS ${constants.KEYSPACE}.GameAnnotations (
        gameID UUID,
        userID UUID,
        pgn list<text>,
        annotations map<text, text>,
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

// export const getReplay = async (gameID) => {
//     const query = `SELECT * FROM ${constants.KEYSPACE}.GameReplay WHERE gameid = ?;`;
//     return (
//       await cassandraClient.execute(query, [gameID], {
//         prepare: true,
//       })
//     ).rows[0]; 
// }

export default createGameAnnotations;
