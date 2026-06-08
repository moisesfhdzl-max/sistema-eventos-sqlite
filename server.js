// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import organizadorRoutes from './src/routes/organizadorRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 
        message: '🎉 API del Sistema de Eventos (SQLite)',
        endpoints: {
            organizadores: 'http://localhost:3000/api/organizadores'
        }
    });
});

app.use('/api/organizadores', organizadorRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});