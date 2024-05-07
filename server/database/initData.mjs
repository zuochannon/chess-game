import { cassandraClient } from "./connection.mjs";
import { insertUser } from "./models/users.mjs";

let uuids = {};

const initUsers = async () => {
  const userData = await Promise.all([
    insertUser("john_doe", "john@example.com", "password123"),
    insertUser("jane_doe", "jane@example.com", "jane"),
    insertUser("bob_smith", "bob@example.com", "bob"),
    insertUser("alice_wonderland", "alice@example.com", "alice"),
    insertUser("charlie_brown", "charlie@example.com", "charlie"),
  ]);

  uuids = userData.reduce((acc, user) => {
    acc[user.username] = user.uuid;
    return acc;
  }, {});

  console.log(uuids);
};

const initGameHistory = async () => {
  const query = `
  BEGIN BATCH

  INSERT INTO GameHistory (gameID, players, playerNames, winnerID, loserID, result, timestamp, turns, moves, game_type)
VALUES (fe2a8e6f-3815-45ef-b0b2-1c51db907e1a, {${uuids.charlie_brown}, ${uuids.bob_smith}}, {'charlie_brown', 'bob_smith'}, ${uuids.charlie_brown}, ${uuids.bob_smith}, 'win', '2024-05-10 15:30:00', 20, ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'O-O', 'Nf6', 'd3', 'O-O'], 'standard');


INSERT INTO GameHistory (gameID, players, playerNames, winnerID, loserID, result, timestamp, turns, moves, game_type)
VALUES (b9af2dcb-c77a-4934-bd56-05679b8a098f, {${uuids.john_doe}, ${uuids.alice_wonderland}}, {'john_doe', 'alice_wonderland'}, ${uuids.john_doe}, ${uuids.alice_wonderland}, 'win', '2024-05-11 10:45:00', 25, ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'Bg5', 'h6', 'Bh4', 'c5'], 'blitz');

INSERT INTO GameHistory (gameID, players, playerNames, result, timestamp, turns, moves, game_type)
VALUES (cd91ec77-4794-4935-b2c2-7d3c0267a8bc, {${uuids.jane_doe}, ${uuids.charlie_brown}}, {'jane_doe', 'charlie_brown'}, 'draw', '2024-05-12 14:20:00', 30, ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'd3', 'd6', 'c3', 'Nf6'], 'rapid');


INSERT INTO GameHistory (gameID, players, playerNames, winnerID, loserID, result, timestamp, turns, moves, game_type)
VALUES (8796c0b8-5b84-4e6e-943f-0555f2f6fd7d, {${uuids.alice_wonderland}, ${uuids.bob_smith}}, {'alice_wonderland', 'bob_smith'}, ${uuids.alice_wonderland}, ${uuids.bob_smith}, 'win', '2024-05-13 11:00:00', 15, ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'O-O', 'd6', 'Nc3', 'Bg4'], 'standard');

INSERT INTO GameHistory (gameID, players, playerNames, winnerID, loserID, result, timestamp, turns, moves, game_type)
VALUES (ff8a4262-cac8-4b0e-80f8-ff4d7eb932c2, {${uuids.charlie_brown}, ${uuids.jane_doe}}, {'charlie_brown', 'jane_doe'}, ${uuids.charlie_brown}, ${uuids.jane_doe}, 'win', '2024-05-14 17:30:00', 22, ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O'], 'blitz');

INSERT INTO GameHistory (gameID, players, playerNames, result, timestamp, turns, moves, game_type)
VALUES (e2e10cd4-7b5a-4c44-b6bf-b6fe3ba891a3, {${uuids.john_doe}, ${uuids.alice_wonderland}}, {'john_doe', 'alice_wonderland'}, 'draw', '2024-05-15 12:10:00', 18, ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7'], 'rapid');

INSERT INTO GameHistory (gameID, players, playerNames, winnerID, loserID, result, timestamp, turns, moves, game_type)
VALUES (c8e067c1-bba5-43f6-9674-3f53e82c3b18, {${uuids.charlie_brown}, ${uuids.jane_doe}}, {'charlie_brown', 'jane_doe'}, ${uuids.jane_doe}, ${uuids.charlie_brown}, 'win', '2024-05-16 09:45:00', 21, ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O'], 'blitz');

  APPLY BATCH;
  `;
  cassandraClient.execute(query);
};

const initCassandraData = async () => {
  //   Promise.all([initUserData()]);
  Promise.all([initGameHistory()]);
};

const initPostgresData = async (sql) => {
  //   Promise.all([initUserAuthData(sql)]);
};

const initData = async (sql) => {
  console.log("inserting data");
  await Promise.all([initUsers()]);
  Promise.all([initCassandraData(), initPostgresData(sql)]);
};

export default initData;
