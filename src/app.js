import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from './routes/task.routes.js';
import productoRoutes from './routes/productos.routes.js';
import supplierRoutes from'./routes/supplier.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', productoRoutes);
app.use('/api',supplierRoutes);
export default app;