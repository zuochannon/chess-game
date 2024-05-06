// expressSetup.mjs

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import expressHandlebars from 'express-handlebars';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.VITE_ORIGIN,
  credentials: true
}));

// Handlebars setup
const Handlebars = expressHandlebars.create({
  extname: '.html',
  partialsDir: join(__dirname, '..', 'front', 'views', 'partials'),
  defaultLayout: false
});
app.engine('html', Handlebars.engine);
app.set('view engine', 'html');
app.set('views', join(__dirname, '..', 'front', 'views'));

// Static files
app.use('/public', express.static(join(__dirname, '..', 'front', 'public')));

export default app;
