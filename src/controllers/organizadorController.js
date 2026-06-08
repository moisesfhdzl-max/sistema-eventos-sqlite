// src/controllers/organizadorController.js
import { getDb } from '../config/database.js';

/**
 * Controlador para manejar las operaciones CRUD de ORGANIZADOR
 */
export const organizadorController = {
    /**
     * Obtiene todos los organizadores
     * @route GET /api/organizadores
     * @returns {Array} Lista de organizadores
     */
    async getAll(req, res) {
        try {
            const db = getDb();
            const rows = db.prepare('SELECT * FROM ORGANIZADOR').all();
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * Obtiene un organizador por su ID
     * @route GET /api/organizadores/:id
     * @param {string} id - ID del organizador
     * @returns {Object} Datos del organizador
     */
    async getById(req, res) {
        try {
            const { id } = req.params;
            const db = getDb();
            const row = db.prepare('SELECT * FROM ORGANIZADOR WHERE organizador_id = ?').get(id);
            if (!row) {
                return res.status(404).json({ error: 'Organizador no encontrado' });
            }
            res.json(row);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * Crea un nuevo organizador
     * @route POST /api/organizadores
     * @param {Object} req.body - Datos del organizador
     * @param {string} req.body.nombre - Nombre del organizador
     * @param {string} req.body.email - Email del organizador
     * @param {string} req.body.telefono - Teléfono del organizador
     * @returns {Object} Organizador creado con su ID
     */
    async create(req, res) {
        try {
            const { nombre, email, telefono } = req.body;
            const db = getDb();
            const result = db.prepare(
                'INSERT INTO ORGANIZADOR (nombre, email, telefono) VALUES (?, ?, ?)'
            ).run(nombre, email, telefono);
            res.status(201).json({ 
                organizador_id: result.lastInsertRowid, 
                nombre, 
                email, 
                telefono 
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    /**
     * Actualiza un organizador existente
     * @route PUT /api/organizadores/:id
     * @param {string} id - ID del organizador a actualizar
     * @param {Object} req.body - Datos a actualizar
     * @returns {Object} Mensaje de confirmación
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, email, telefono } = req.body;
            const db = getDb();
            const result = db.prepare(
                'UPDATE ORGANIZADOR SET nombre = ?, email = ?, telefono = ? WHERE organizador_id = ?'
            ).run(nombre, email, telefono, id);
            if (result.changes === 0) {
                return res.status(404).json({ error: 'Organizador no encontrado' });
            }
            res.json({ message: 'Organizador actualizado exitosamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    /**
     * Elimina un organizador
     * @route DELETE /api/organizadores/:id
     * @param {string} id - ID del organizador a eliminar
     * @returns {Object} Mensaje de confirmación
     */
    async delete(req, res) {
        try {
            const { id } = req.params;
            const db = getDb();
            const result = db.prepare('DELETE FROM ORGANIZADOR WHERE organizador_id = ?').run(id);
            if (result.changes === 0) {
                return res.status(404).json({ error: 'Organizador no encontrado' });
            }
            res.json({ message: 'Organizador eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};