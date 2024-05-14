import { cassandraClient } from "../../../connection.mjs";
import constants from "../../../constants.mjs";

const createBoardType = async () => {
    const query = `CREATE TYPE IF NOT EXISTS ${constants.KEYSPACE}.Board(
        pieces list<frozen <Piece>>, 
        turns int,
    );`
    await cassandraClient.execute(query);
    console.log("created coordinate type");
}

const createPieceType = async () => {
    const query = `CREATE TYPE IF NOT EXISTS ${constants.KEYSPACE}.Piece(
        position frozen <Position>,
        type text,
        color text,
        hasMoved boolean
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
    await createBoardType();

  const query = `CREATE TABLE IF NOT EXISTS ${constants.KEYSPACE}.GameReplay (
        gameID UUID,
        states list<frozen <Board>>,
        winningTeam text,
        PRIMARY KEY (gameID)
    );`;
  await cassandraClient.execute(query);
  console.log("created game replay table");
};

export const insertReplay = async (states, winningTeam) => {
    const query = `INSERT INTO ${constants.KEYSPACE}.GameReplay (gameID, states, winningTeam) VALUES (uuid(), ?, ?);`
    await cassandraClient.execute(query, [states, winningTeam], {
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
