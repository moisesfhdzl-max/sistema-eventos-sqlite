# Sistema de Eventos - Backend API (SQLite)

## Integrantes del equipo
- [Nombre: Moises Fernando Hernadez Lucas] - [Matrícula: 221563] - [Carrera: ISC] 


## Materia y Profesor
- **Materia:** Desarrollo de Aplicaciones con Base de Datos
- **Profesor:** [Jesus Alejandro Flores Hernandez]

## Cómo ejecutar
```bash
npm install
npm run init-db
npm run dev

```

## Endpoints 
```bash
Método	Endpoint	Descripción
GET	/api/organizadores	Listar todos
GET	/api/organizadores/:id	Obtener uno
POST	/api/organizadores	Crear
PUT	/api/organizadores/:id	Actualizar
DELETE	/api/organizadores/:id	Eliminar
```

##  Cómo ejecutar el proyecto

### Requisitos previos
- Node.js 20.x o superior (tuve problemas de compatibilidad =, asi que tuve que usar una version mas antigua)
- npm (viene con Node.js)

### Pasos de instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/moisesfhdzl-max/sistema-eventos-sqlite.git

# 2. Entrar al proyecto
cd sistema-eventos-sqlite

# 3. Instalar dependencias
npm install

# 4. Crear archivo .env (opcional, valores por defecto funcionan)
echo "PORT=3000" > .env
echo "DB_NAME=app.db" >> .env

# 5. Inicializar la base de datos (crea tablas y datos de ejemplo)
npm run init-db

# 6. Iniciar el servidor
npm run dev

##  Explicación de la Base de Datos

### Diagrama de tablas

- **ORGANIZADOR:** Almacena los organizadores de eventos
- **EVENTO:** Almacena los eventos (pertenece a un organizador)
- **SALA:** Almacena las salas disponibles
- **SESION:** Almacena las sesiones de cada evento
- **PONENTE:** Almacena los ponentes
- **SESION_PONENTE:** Relaciona sesiones con ponentes
- **USUARIO:** Almacena los usuarios registrados
- **INSCRIPCION:** Relaciona usuarios con sesiones (inscripciones)

### Datos de ejemplo incluidos

- 3 organizadores
- 3 eventos
- 4 salas
- 4 sesiones
- 3 ponentes
- 3 usuarios
- 4 inscripciones