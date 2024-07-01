import pool from "../../database/config.js";
// Funcion para obtener datos limitados de joyas con paginación y ordenamiento.
export const getJoyasModel = async (limits, offset, column, order) => {
    const queryGetJoyas = {
        text: `SELECT * FROM inventario ORDER BY ${column} ${order} LIMIT $1 OFFSET $2`,
        values: [limits, offset]
    };
    try {
        const result = await pool.query(queryGetJoyas);
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener datos de la base de datos');
    }
};
// Funcion para obtener todos los registros con conteo de total de registros 
export const getTotalJoyas = async () => {
    const queryTotal = { text: 'SELECT COUNT(*) FROM inventario' };
    try {
        const result = await pool.query(queryTotal);
        return parseInt(result.rows[0].count);
    } catch (error) {
        throw new Error('Error al obtener el total de joyas de la base de datos');
    }
};
// Funcion para obtener registros filtrados por precio minimo, precio maximo, categoría y tipo de metal de las joyas.
export const getJoyasByFiltersModel = async (precio_min, precio_max, categoria, metal) => {
    const conditions = [];
    const values = [];

    if (precio_min) {
        conditions.push('precio >= $' + (values.length + 1));
        values.push(precio_min);
    }
    if (precio_max) {
        conditions.push('precio <= $' + (values.length + 1));
        values.push(precio_max);
    }
    if (categoria) {
        conditions.push('categoria = $' + (values.length + 1));
        values.push(categoria);
    }
    if (metal) {
        conditions.push('metal = $' + (values.length + 1));
        values.push(metal);
    }

    const queryGetJoyasByFilters = {
        text: `SELECT * FROM inventario WHERE ${conditions.join(' AND ')}`,
        values
    };
    try {
        const result = await pool.query(queryGetJoyasByFilters);
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener datos de la base de datos con filtros');
    }
};


