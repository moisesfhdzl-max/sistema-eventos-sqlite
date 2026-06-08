// src/controllers/organizadorController.js
import { getDb } from '../config/database.js';

export const organizadorController = {
    async getAll(req, res) {
        try {
            const db = getDb();
            const rows = db.prepare('SELECT * FROM ORGANIZADOR').all();
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

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