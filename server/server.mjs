import { client } from './database/connection.mjs';
import { types } from 'cassandra-driver';
import ENV from './EnvVars.mjs';
import express from 'express';
import cors from 'cors';
import { initDB } from './database/initDB.mjs';
import constants from './database/constants.mjs';

const app = express();
app.use(cors());
app.use(express.json());

initDB();

app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
});