// require('dotenv').config({ path: './env' });
import dotenv from 'dotenv';
import express from 'express';

import { connectDB } from './database/index.js';

dotenv.config({ path: './.env' });

const app = express();

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on address http://localhost:${port}`);
});
