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

export const getAnnotations = async (gameID, userID) => {
  const query = `SELECT annotations FROM ${constants.KEYSPACE}.GameAnnotations WHERE gameid = ? AND userid = ?;`;
  return (
    await cassandraClient.execute(query, [gameID, userID], {
      prepare: true,
    })
  ).rows[0].annotations;
};

export const updateAnnotation = async (gameID, userID, moveTuple, annotation) => {
  await cassandraClient.execute(
    `UPDATE ${constants.KEYSPACE}.GameAnnotations SET annotations[${moveTuple}] = ? WHERE gameid = ? AND userid = ?;`,
    [annotation, gameID, userID],
    { prepare: true }
  );
};

export default createGameAnnotations;
