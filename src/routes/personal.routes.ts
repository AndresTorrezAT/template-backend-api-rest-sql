import { Router } from 'express';
import { crearPersonal, obtenerPersonal } from '../controllers/personal.controller';


const router = Router();

router.post('/', crearPersonal); // Ruta válida

router.get('/', obtenerPersonal); // Ruta válida

export default router;