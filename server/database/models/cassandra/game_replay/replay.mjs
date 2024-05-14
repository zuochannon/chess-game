import { cassandraClient } from "../../../connection.mjs";
import constants from "../../../constants.mjs";

const createBoardType = async () => {
    const query = `CREATE TYPE IF NOT EXISTS ${constants.KEYSPACE}.Board(
        pieces list<frozen <Piece>>, 
        turns int
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
        PRIMARY KEY (gameID)
    );`;
  await cassandraClient.execute(query);
  console.log("created game replay table");
};

// const getDrawGames = async (userID) => {
//   const query = `SELECT gameid, timestamp, game_type, playerNames, turns, comments FROM ${constants.KEYSPACE}.GameHistory WHERE players CONTAINS ? AND result='draw' ALLOW FILTERING;`;
//   return (
//     await cassandraClient.execute(query, [userID], {
//       prepare: true,
//     })
//   ).rows;
// };

// const getWonGames = async (userID) => {
//   const query = `SELECT gameid, timestamp, game_type, playerNames, turns, comments FROM ${constants.KEYSPACE}.GameHistory WHERE winnerid = ? ALLOW FILTERING;`;
//   return (
//     await cassandraClient.execute(query, [userID], {
//       prepare: true,
//     })
//   ).rows;
// };

// const getLostGames = async (userID) => {
//   const query = `SELECT gameid, timestamp, game_type, playerNames, turns, comments FROM ${constants.KEYSPACE}.GameHistory WHERE loserid = ? ALLOW FILTERING;`;
//   return (
//     await cassandraClient.execute(query, [userID], {
//       prepare: true,
//     })
//   ).rows;
// };

// export const getGames = async (userID) => {
//   const [won, lost, draw] = await Promise.all([
//     getWonGames(userID),
//     getLostGames(userID),
//     getDrawGames(userID),
//   ]);

//   won.forEach(el => el.result = "won");
//   lost.forEach(el => el.result = "lost");
//   draw.forEach(el => el.result = "draw");

//   return {
//     won,
//     lost,
//     draw,
//   };
// };

// export const updateComment = async (gameID, comment) => {
//   await cassandraClient.execute(
//     `UPDATE ${constants.KEYSPACE}.GameHistory SET comments = ? WHERE gameid=?`,
//     [comment, gameID],
//     { prepare: true }
//   );
// }

export default createGameReplay;
