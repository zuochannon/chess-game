import { client } from './database/connection.mjs';
import { types } from 'cassandra-driver';
import ENV from './EnvVars.mjs';
import express from 'express';
import cors from 'cors';
import { initDB } from './database/initDB.mjs';
import constants from './database/constants.mjs';
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

initDB();

app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
});

// REMOVE ON PROD
app.get('/users', async (req, res) => {
    try {
        const query = `SELECT * FROM ${constants.KEYSPACE}.Users`;
        const result = await client.execute(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing Cassandra query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const query = `SELECT password FROM ${constants.KEYSPACE}.Users WHERE username='${username}' ALLOW FILTERING;`;
        const result = await client.execute(query);

        if (!result.rows.length) 
            return res.status(401).json({ error: "User not found, please sign up." });

        const passwordMatch = await bcrypt.compare(password, result.rows[0]);

        if (passwordMatch) 
            res.json({ message: "Login successful" });
        else 
            res.status(401).json({ error: "Incorrect password." });
    } catch (error) {
        console.error('Error executing Cassandra query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});