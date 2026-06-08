// scripts/initDatabase.js
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const db = new Database(process.env.DB_NAME || 'app.db');

console.log('🏗️  Creando tablas...');

// Crear tabla ORGANIZADOR
db.exec(`
    CREATE TABLE IF NOT EXISTS ORGANIZADOR (
        organizador_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        telefono TEXT
    )
`);

// Crear tabla EVENTO
db.exec(`
    CREATE TABLE IF NOT EXISTS EVENTO (
        evento_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        fecha_inicio TEXT NOT NULL,
        fecha_fin TEXT NOT NULL,
        lugar TEXT,
        organizador_id INTEGER NOT NULL,
        FOREIGN KEY (organizador_id) REFERENCES ORGANIZADOR(organizador_id) ON DELETE CASCADE
    )
`);

// Crear tabla SALA
db.exec(`
    CREATE TABLE IF NOT EXISTS SALA (
        sala_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_sala TEXT NOT NULL,
        capacidad INTEGER NOT NULL,
        ubicacion TEXT
    )
`);

// Crear tabla SESION
db.exec(`
    CREATE TABLE IF NOT EXISTS SESION (
        sesion_id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        hora_inicio TEXT NOT NULL,
        hora_fin TEXT NOT NULL,
        evento_id INTEGER NOT NULL,
        sala_id INTEGER NOT NULL,
        FOREIGN KEY (evento_id) REFERENCES EVENTO(evento_id) ON DELETE CASCADE,
        FOREIGN KEY (sala_id) REFERENCES SALA(sala_id) ON DELETE RESTRICT
    )
`);

// Crear tabla PONENTE
db.exec(`
    CREATE TABLE IF NOT EXISTS PONENTE (
        ponente_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        biografia TEXT,
        email TEXT UNIQUE NOT NULL
    )
`);

// Crear tabla SESION_PONENTE
db.exec(`
    CREATE TABLE IF NOT EXISTS SESION_PONENTE (
        sesion_id INTEGER NOT NULL,
        ponente_id INTEGER NOT NULL,
        PRIMARY KEY (sesion_id, ponente_id),
        FOREIGN KEY (sesion_id) REFERENCES SESION(sesion_id) ON DELETE CASCADE,
        FOREIGN KEY (ponente_id) REFERENCES PONENTE(ponente_id) ON DELETE CASCADE
    )
`);

// Crear tabla USUARIO
db.exec(`
    CREATE TABLE IF NOT EXISTS USUARIO (
        usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        fecha_registro TEXT NOT NULL DEFAULT CURRENT_DATE
    )
`);

// Crear tabla INSCRIPCION
db.exec(`
    CREATE TABLE IF NOT EXISTS INSCRIPCION (
        usuario_id INTEGER NOT NULL,
        sesion_id INTEGER NOT NULL,
        fecha_inscripcion TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (usuario_id, sesion_id),
        FOREIGN KEY (usuario_id) REFERENCES USUARIO(usuario_id) ON DELETE CASCADE,
        FOREIGN KEY (sesion_id) REFERENCES SESION(sesion_id) ON DELETE CASCADE
    )
`);

console.log('✅ Tablas creadas');
console.log('📝 Insertando datos de ejemplo...');

// Insertar ORGANIZADORES
db.exec(`
    INSERT OR IGNORE INTO ORGANIZADOR (nombre, email, telefono) VALUES
    ('Tech Events SA', 'contacto@techevents.com', '555-0101'),
    ('Cultural Forum', 'info@culturalforum.org', '555-0102'),
    ('Educa Digital', 'eventos@educadigital.com', '555-0103')
`);

// Insertar EVENTOS
db.exec(`
    INSERT OR IGNORE INTO EVENTO (nombre, fecha_inicio, fecha_fin, lugar, organizador_id) VALUES
    ('Conferencia Tech 2025', '2025-03-15', '2025-03-17', 'Centro de Convenciones', 1),
    ('Festival Cultural', '2025-04-20', '2025-04-22', 'Teatro Municipal', 2),
    ('Workshop Desarrollo Web', '2025-05-10', '2025-05-11', 'Espacio Coworking', 3)
`);

// Insertar SALAS
db.exec(`
    INSERT OR IGNORE INTO SALA (nombre_sala, capacidad, ubicacion) VALUES
    ('Auditorio Principal', 500, 'Piso 1'),
    ('Sala A', 100, 'Piso 2'),
    ('Sala B', 80, 'Piso 2'),
    ('Sala de Talleres', 50, 'Piso 3')
`);

// Insertar SESIONES
db.exec(`
    INSERT OR IGNORE INTO SESION (titulo, hora_inicio, hora_fin, evento_id, sala_id) VALUES
    ('Keynote: IA en 2025', '2025-03-15 09:00:00', '2025-03-15 11:00:00', 1, 1),
    ('Taller de Python Avanzado', '2025-03-15 14:00:00', '2025-03-15 17:00:00', 1, 4),
    ('Concierto de Apertura', '2025-04-20 19:00:00', '2025-04-20 21:00:00', 2, 1),
    ('React para Principiantes', '2025-05-10 10:00:00', '2025-05-10 13:00:00', 3, 3)
`);

// Insertar PONENTES
db.exec(`
    INSERT OR IGNORE INTO PONENTE (nombre, biografia, email) VALUES
    ('Dra. María González', 'Experta en IA con 15 años de experiencia', 'maria.gonzalez@email.com'),
    ('Ing. Carlos López', 'Desarrollador Senior en Google', 'carlos.lopez@email.com'),
    ('Mtro. Juan Pérez', 'Especialista en metodologías ágiles', 'juan.perez@email.com')
`);

// Insertar SESION_PONENTE
db.exec(`
    INSERT OR IGNORE INTO SESION_PONENTE (sesion_id, ponente_id) VALUES
    (1, 1), (2, 2), (4, 3)
`);

// Insertar USUARIOS
db.exec(`
    INSERT OR IGNORE INTO USUARIO (nombre, email, fecha_registro) VALUES
    ('Ana Martínez', 'ana.martinez@email.com', '2025-01-15'),
    ('Luis Rodríguez', 'luis.rodriguez@email.com', '2025-01-16'),
    ('Sofía Hernández', 'sofia.hernandez@email.com', '2025-01-17')
`);

// Insertar INSCRIPCIONES
db.exec(`
    INSERT OR IGNORE INTO INSCRIPCION (usuario_id, sesion_id, fecha_inscripcion) VALUES
    (1, 1, CURRENT_TIMESTAMP), (1, 2, CURRENT_TIMESTAMP), 
    (2, 1, CURRENT_TIMESTAMP), (3, 4, CURRENT_TIMESTAMP)
`);

console.log('✅ Datos de ejemplo insertados');

// Verificar resultados
const countOrganizadores = db.prepare('SELECT COUNT(*) as total FROM ORGANIZADOR').get();
console.log(`📊 Organizadores: ${countOrganizadores.total}`);

const countEventos = db.prepare('SELECT COUNT(*) as total FROM EVENTO').get();
console.log(`📊 Eventos: ${countEventos.total}`);

const countSalas = db.prepare('SELECT COUNT(*) as total FROM SALA').get();
console.log(`📊 Salas: ${countSalas.total}`);

db.close();
console.log('🎉 Base de datos inicializada correctamente');