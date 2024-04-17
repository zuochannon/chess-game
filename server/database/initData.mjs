import { client } from "./connection.mjs";

const initUserData = async () => {
    const query = `
    BEGIN BATCH

    INSERT INTO Users (userID, username, email, password) VALUES
    (1, 'john_doe', 'john@example.com', 'password123');
    INSERT INTO Users (userID, username, email, password) VALUES
    (2, 'jane_doe', 'jane@example.com', 'letmein');
    INSERT INTO Users (userID, username, email, password) VALUES
    (3, 'bob_smith', 'bob@example.com', 'securepassword');
    INSERT INTO Users (userID, username, email, password) VALUES
    (4, 'alice_wonderland', 'alice@example.com', 'pa$$w0rd');
    INSERT INTO Users (userID, username, email, password) VALUES
    (5, 'charlie_brown', 'charlie@example.com', '12345678');

    APPLY BATCH;`;

    client.execute(query);
};

const initData = async () => {
    console.log("inserting data");
    initUserData();
}

export default initData;