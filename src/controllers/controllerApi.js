import { getJoyasModel, getTotalJoyas, getJoyasByFiltersModel } from "../models/modelsApi.js";
import chalk from 'chalk';

// Muestra mensaje en consola en azul OK cuando se consulta la ruta raíz.
export const raizServer = (req, res) => {
    console.log(chalk.green('Ruta raíz consultada'));
    res.send(chalk.blue('OK'));
};

// Maneja todas las consultas get para limits, page, y order_by
export const getJoyas = async (req, res) => {
    try {
        const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;

        const [column, order] = order_by.split('_');
        const offset = (page - 1) * limits;

        const joyasGet = await getJoyasModel(limits, offset, column, order.toUpperCase());
        const totalJoyas = await getTotalJoyas();

        const totalPages = Math.ceil(totalJoyas / limits);
        // Maneja respuesta con los datos de las joyas, paginación y enlaces HATEOAS
        const response = {
            data: joyasGet,
            total: totalJoyas,
            limit: parseInt(limits),
            page: parseInt(page),
            totalPages: totalPages,
            links: {
                self: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                next: page < totalPages ? `${req.protocol}://${req.get('host')}/joyas?limits=${limits}&page=${page + 1}&order_by=${order_by}` : null,
                prev: page > 1 ? `${req.protocol}://${req.get('host')}/joyas?limits=${limits}&page=${page - 1}&order_by=${order_by}` : null
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Maneja las consultas GET a la ruta /joyas/filtros
export const getJoyasByFilters = async (req, res) => {
    try {
        const { precio_min = 0, precio_max = 9999999, categoria, metal } = req.query;

        const joyasGet = await getJoyasByFiltersModel(precio_min, precio_max, categoria, metal);

        res.status(200).json(joyasGet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};








