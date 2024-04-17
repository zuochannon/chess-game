import { client } from "./connection.mjs";

const initUserData = async () => {
    const query = `
    BEGIN BATCH

    INSERT INTO Users (userID, username, email, password) VALUES
    (uuid(), 'john_doe', 'john@example.com', '$2b$10$KWRETRRvAeAjChRilT.VOOQ3gGPbH8nRwFqANXWaLW0tmoyllryGq');
    INSERT INTO Users (userID, username, email, password) VALUES
    (uuid(), 'jane_doe', 'jane@example.com', '$2b$10$rIlWsRb9nE9j4BnIRlfiguETFlStzxPULjLBW8dsK.Baf6YKVgwYW');
    INSERT INTO Users (userID, username, email, password) VALUES
    (uuid(), 'bob_smith', 'bob@example.com', '$2b$10$cBR6G.vCch6q95P8haF8KOQgAnsOnjCuqTbVfHGCgUdsGW7o9BL1S');
    INSERT INTO Users (userID, username, email, password) VALUES
    (uuid(), 'alice_wonderland', 'alice@example.com', '$2b$10$P6.opQM1nMR8x0JNusfeWOGk/rKtswnzowCwzeODQA6lasTXU8hi6');
    INSERT INTO Users (userID, username, email, password) VALUES
    (uuid(), 'charlie_brown', 'charlie@example.com', '$2b$10$PkV/Pdlw1YMH0C3EzLqC5Okkb4AeRH6d15G/6FNrjS.3HgdUkK0Hu');

    APPLY BATCH;`;

    client.execute(query);
};

const initData = async () => {
    console.log("inserting data");
    initUserData();
}

export default initData;