// require('dotenv').config({ path: './env' });
import dotenv from 'dotenv';

import { connectDB } from './database/index.js';
import app from './app.js';

dotenv.config({ path: './.env' });

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on address http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('mongoDB connection failed :', error);
  });
