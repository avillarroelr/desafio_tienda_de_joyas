import { Router } from "express";
import { getJoyas, raizServer, getJoyasByFilters } from "../controllers/controllerApi.js";

const router = Router();
// Definicion de las rutas raiz(de prueba),joyas y joyas/filtros
router.get('/', raizServer);
router.get('/joyas', getJoyas);
router.get('/joyas/filtros', getJoyasByFilters);

export default router;

