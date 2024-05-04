import { cassandraClient, pool } from "./connection.mjs";

const initUserData = async () => {
    const query = `
    BEGIN BATCH

    INSERT INTO Users (userID, username, email) VALUES
    (uuid(), 'john_doe', 'john@example.com');
    INSERT INTO Users (userID, username, email) VALUES
    (uuid(), 'jane_doe', 'jane@example.com');
    INSERT INTO Users (userID, username, email) VALUES
    (uuid(), 'bob_smith', 'bob@example.com');
    INSERT INTO Users (userID, username, email) VALUES
    (uuid(), 'alice_wonderland', 'alice@example.com');
    INSERT INTO Users (userID, username, email) VALUES
    (uuid(), 'charlie_brown', 'charlie@example.com');

    APPLY BATCH;`;

    cassandraClient.execute(query);
};

const initUserAuthData = async () => {
    await pool.query(`INSERT INTO Users
    (username, email, password)
    VALUES
    ('john_doe', 'john@example.com', '$2b$10$KWRETRRvAeAjChRilT.VOOQ3gGPbH8nRwFqANXWaLW0tmoyllryGq'),
    ('jane_doe', 'jane@example.com', '$2b$10$rIlWsRb9nE9j4BnIRlfiguETFlStzxPULjLBW8dsK.Baf6YKVgwYW'),
    ('bob_smith', 'bob@example.com', '$2b$10$cBR6G.vCch6q95P8haF8KOQgAnsOnjCuqTbVfHGCgUdsGW7o9BL1S'),
    ('alice_wonderland', 'alice@example.com', '$2b$10$P6.opQM1nMR8x0JNusfeWOGk/rKtswnzowCwzeODQA6lasTXU8hi6'),
    ('charlie_brown', 'charlie@example.com', '$2b$10$PkV/Pdlw1YMH0C3EzLqC5Okkb4AeRH6d15G/6FNrjS.3HgdUkK0Hu');
  `);
}

const initCassandraData = async () => {
    Promise.all([
        initUserData(),
    ]);
};

const initPostgresData = async (sql) => {
    Promise.all([
        initUserAuthData(sql),
    ]);
};

const initData = async (sql) => {
    console.log("inserting data");
    Promise.all([
        initCassandraData(),
        initPostgresData(sql)
    ]);
}

export default initData;