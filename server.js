// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import organizadorRoutes from './src/routes/organizadorRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==================== MIDDLEWARES ====================
// Habilita CORS para permitir peticiones desde el navegador
app.use(cors());

// Permite recibir JSON en el cuerpo de las peticiones
app.use(express.json());

// ==================== RUTAS ====================

/**
 * Ruta de bienvenida
 * @route GET /
 * @returns {Object} Mensaje de bienvenida y lista de endpoints disponibles
 */
app.get('/', (req, res) => {
    res.json({ 
        message: '🎉 API del Sistema de Eventos (SQLite)',
        version: '1.0.0',
        endpoints: {
            organizadores: 'http://localhost:3000/api/organizadores'
        }
    });
});

/**
 * Rutas para el recurso ORGANIZADOR
 * @baseRoute /api/organizadores
 */
app.use('/api/organizadores', organizadorRoutes);

// ==================== MANEJADORES DE ERRORES ====================

/**
 * Manejador de rutas no encontradas (404)
 */
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

/**
 * Manejador de errores global
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// ==================== INICIAR SERVIDOR ====================

app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});