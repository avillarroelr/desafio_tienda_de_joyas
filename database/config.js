import pg from 'pg';
import dotenv from 'dotenv';

// CARGANDO LAS VARIABLES DE ENTORNO DESDE .env
dotenv.config({ path: './.env' });

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    allowExitOnIdle: true,
});

// MOSTRANDO MENSAJE DE RESULTADO DE CONEXIÓN
pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.log('ERROR AL CONECTAR A DB', err);
    } else {
        console.log('BASE DE DATOS CONECTADA', res.rows[0].now);
    }
});

export default pool;
