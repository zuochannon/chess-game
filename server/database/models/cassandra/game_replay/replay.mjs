import { cassandraClient } from "../../../connection.mjs";
import constants from "../../../constants.mjs";

const createPieceType = async () => {
    const query = `CREATE TYPE IF NOT EXISTS ${constants.KEYSPACE}.Piece(
        position frozen <Position>,
        type text,
        color text
    );`
    await cassandraClient.execute(query);
    console.log("created piece type");
}

const createPositionType = async () => {
    const query = `CREATE TYPE IF NOT EXISTS ${constants.KEYSPACE}.Position(
        x int,
        y int
    );`
    await cassandraClient.execute(query);
    console.log("created position type");
}

const createGameReplay = async () => {

    await createPositionType();
    await createPieceType();

  const query = `CREATE TABLE IF NOT EXISTS ${constants.KEYSPACE}.GameReplay (
        gameID UUID,
        pieces list<frozen <list<frozen <Piece>>>>,
        totalTurns int,
        winningTeam text,
        pgn list<text>,
        PRIMARY KEY (gameID)
    );`;
  await cassandraClient.execute(query);
  console.log("created game replay table");
};

export const insertReplay = async (gameID, pieces, totalTurns, winningTeam, pgn) => {
    const query = `INSERT INTO ${constants.KEYSPACE}.GameReplay (gameid, pieces, totalTurns, winningTeam, pgn) VALUES (?, ?, ?, ?, ?);`
    await cassandraClient.execute(query, [gameID, pieces, totalTurns, winningTeam, pgn], {
        prepare: true,
    });
}

export const getReplay = async (gameID) => {
    const query = `SELECT * FROM ${constants.KEYSPACE}.GameReplay WHERE gameid = ?;`;
    return (
      await cassandraClient.execute(query, [gameID], {
        prepare: true,
      })
    ).rows[0]; 
}

export default createGameReplay;
