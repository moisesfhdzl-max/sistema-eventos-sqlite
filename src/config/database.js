// src/config/database.js
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

let db = null;

export function getDb() {
    if (!db) {
        db = new Database(process.env.DB_NAME || 'app.db');
        console.log('📀 Conexión a SQLite establecida');
    }
    return db;
}

export function closeDb() {
    if (db) {
        db.close();
        db = null;
        console.log('🔌 Conexión a SQLite cerrada');
    }
}

export default { getDb, closeDb };