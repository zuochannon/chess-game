import { cassandraClient } from "../../../connection.mjs";
import constants from "../../../constants.mjs";

const createGameHistory = async () => {
  const query = `CREATE TABLE IF NOT EXISTS ${constants.KEYSPACE}.GameHistory (
        gameID UUID,
        players SET<UUID>,
        playerNames SET<TEXT>,
        winnerID UUID,
        loserID UUID,
        result TEXT,
        timestamp TIMESTAMP,
        turns INT,
        moves LIST<TEXT>,
        game_type TEXT,
        PRIMARY KEY (gameID, timestamp)
    ) WITH CLUSTERING ORDER BY (timestamp DESC);`;
  await cassandraClient.execute(query);
  console.log("created game history table");
};

const getDrawGames = async (userID) => {
  const query = `SELECT gameid, timestamp, game_type, playerNames, result, turns FROM ${constants.KEYSPACE}.GameHistory WHERE players CONTAINS ? AND result='draw' ALLOW FILTERING;`;
  return (
    await cassandraClient.execute(query, [userID], {
      prepare: true,
    })
  ).rows;
};

const getWonGames = async (userID) => {
  const query = `SELECT gameid, timestamp, game_type, playerNames, result, turns FROM ${constants.KEYSPACE}.GameHistory WHERE winnerid = ? ALLOW FILTERING;`;
  return (
    await cassandraClient.execute(query, [userID], {
      prepare: true,
    })
  ).rows;
};

const getLostGames = async (userID) => {
  const query = `SELECT gameid, timestamp, game_type, playerNames, result, turns FROM ${constants.KEYSPACE}.GameHistory WHERE loserid = ? ALLOW FILTERING;`;
  return (
    await cassandraClient.execute(query, [userID], {
      prepare: true,
    })
  ).rows;
};

export const getGames = async (userID) => {
  const [won, lost, draw] = await Promise.all([
    getWonGames(userID),
    getLostGames(userID),
    getDrawGames(userID),
  ]);

  return {
    won,
    lost,
    draw,
  };
};

export default createGameHistory;
