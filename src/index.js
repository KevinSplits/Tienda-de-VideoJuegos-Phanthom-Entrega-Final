import dotenv from 'dotenv';
import { server } from './app.js'; // Importa el servidor desde app.js
import { connectDB } from './db.js'

connectDB();
dotenv.config();