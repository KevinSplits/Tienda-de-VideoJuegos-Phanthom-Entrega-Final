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
// Crear servidor HTTP con WebSocket
const server = http.createServer(app);

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

// Exportar el servidor para usarlo en otros archivos
export { server };

// Configuración para que el servidor escuche en el puerto especificado
const PORT = process.env.PORT || 4000; // Usa el puerto de producción o 4000 en local
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
