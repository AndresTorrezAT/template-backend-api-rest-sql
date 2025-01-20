import { Router } from 'express';
import { crearPersonal, obtenerPersonalById } from '../controllers/personal.controller';

const router = Router();

router.post('/', crearPersonal); // Ruta válida

router.get('/:id', obtenerPersonalById); // Ruta válida

export default router;