import { cassandraClient } from "../../../connection.mjs";
import constants from "../../../constants.mjs";

const createGameHistory = async () => {
  const query = `CREATE TABLE IF NOT EXISTS ${constants.KEYSPACE}.GameHistory (
        gameID UUID,
        players SET<UUID>,
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

export default createGameHistory;
