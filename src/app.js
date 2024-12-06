import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js";
import productoRoutes from './routes/productos.routes.js';
import supplierRoutes from'./routes/supplier.routes.js'
import clienteRoutes from './routes/clientes.routes.js'
import saleRoutes from './routes/sale.routes.js'

const app = express();

app.use(cors({
    origin: 'https://front-mdw.netlify.app/',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', productoRoutes);
app.use('/api',supplierRoutes);
app.use('/api',clienteRoutes);
app.use('/api', saleRoutes);
export default app;