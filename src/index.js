import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './db.js'

connectDB();
dotenv.config();